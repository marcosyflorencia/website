import test from 'node:test';
import assert from 'node:assert/strict';
import { createWixContactService } from '../src/services/wixForms.js';

const config = { clientId: 'public-client-id', formId: 'form-id',
  fieldKeys: { name: 'first_name', email: 'email', message: 'message' } };
const input = { name: ' Test Visitor ', email: 'visitor@example.com', message: ' Test inquiry ' };
const reply = (body, status = 200) => new Response(JSON.stringify(body), { status });
test('uses anonymous OAuth and sends only mapped field targets', async () => {
  const calls = [];
  const submit = createWixContactService({ ...config, fetchImpl: async (url, options) => {
    calls.push({ url, options });
    return url.endsWith('/token') ? reply({ access_token: 'visitor-token', expires_in: 14400 })
      : reply({ submission: { id: 'receipt', status: 'CONFIRMED' } });
  } });
  assert.deepEqual(await submit(input), { id: 'receipt' });
  assert.deepEqual(JSON.parse(calls[0].options.body), { clientId: config.clientId, grantType: 'anonymous' });
  assert.deepEqual(JSON.parse(calls[1].options.body), { submission: { formId: 'form-id',
    submissions: { first_name: 'Test Visitor', email: input.email, message: 'Test inquiry' } } });
  assert.equal(calls[1].options.headers.Authorization, 'visitor-token');
  await submit(input);
  assert.equal(calls.filter(call => call.url.endsWith('/token')).length, 1);
});
test('does not claim success for pending submissions', async () => {
  const submit = createWixContactService({ ...config, fetchImpl: async url => url.endsWith('/token')
    ? reply({ access_token: 'visitor-token', expires_in: 14400 })
    : reply({ submission: { id: 'receipt', status: 'PENDING' } }) });
  await assert.rejects(submit(input), error => error.code === 'UNCONFIRMED');
});
test('accepts a default-confirmed Wix Forms receipt only for the configured form', async () => {
  const submit = createWixContactService({ ...config, fetchImpl: async url => url.endsWith('/token')
    ? reply({ access_token: 'visitor-token', expires_in: 14400 })
    : reply({ submission: { id: 'receipt', formId: config.formId, namespace: 'wix.form_app.form' } }) });
  assert.deepEqual(await submit(input), { id: 'receipt' });
});
test('supports the documented SDK-style receipt ID without accepting other forms', async () => {
  let wrongForm = false;
  const submit = createWixContactService({ ...config, fetchImpl: async url => url.endsWith('/token')
    ? reply({ access_token: 'visitor-token', expires_in: 14400 })
    : reply({ submission: { _id: 'receipt', status:'CONFIRMED', formId: wrongForm ? 'other-form' : config.formId } }) });
  assert.deepEqual(await submit(input), { id: 'receipt' });
  wrongForm = true;
  await assert.rejects(submit(input), error => error.code === 'UNCONFIRMED');
});
test('does not claim success without a receipt ID or a known confirmation status', async () => {
  for (const submission of [{status:'CONFIRMED'}, {id:'receipt'}, {id:'receipt',status:'PAYMENT_WAITING'}]) {
    const submit = createWixContactService({ ...config, fetchImpl: async url => url.endsWith('/token')
      ? reply({ access_token: 'visitor-token', expires_in: 14400 }) : reply({ submission }) });
    await assert.rejects(submit(input), error => error.code === 'UNCONFIRMED');
  }
});
test('preserves CAPTCHA protections and does not retry rejected submissions', async () => {
  let submissions = 0;
  const submit = createWixContactService({ ...config, fetchImpl: async url => {
    if (url.endsWith('/token')) return reply({ access_token: 'token', expires_in: 14400 });
    submissions++;
    return reply({ details: { applicationError: { code: 'CAPTCHA_REQUIRED' } } }, 428);
  } });
  await assert.rejects(submit(input), error => error.code === 'CAPTCHA_REQUIRED');
  assert.equal(submissions, 1);
});
test('makes no requests with missing configuration or invalid input', async () => {
  const fetchImpl = () => { throw new Error('Unexpected request'); };
  await assert.rejects(createWixContactService({ ...config, clientId: '', fetchImpl })(input),
    error => error.code === 'NOT_CONFIGURED');
  await assert.rejects(createWixContactService({ ...config, fetchImpl })({ ...input, email: 'invalid' }),
    error => error.code === 'INVALID_INPUT');
});
