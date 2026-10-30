// Public visitor OAuth only. Never put an admin API key or client secret here.
const API_ORIGIN = 'https://www.wixapis.com';
const REQUEST_TIMEOUT = 15000;

export class WixFormError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'WixFormError';
    this.code = code;
  }
}

export function createWixContactService({ clientId, formId, fieldKeys, fetchImpl = fetch }) {
  let visitorSession;
  let authenticating;

  async function request(path, options) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
    try {
      const response = await fetchImpl(`${API_ORIGIN}${path}`, {
        ...options,
        signal: controller.signal,
        credentials: 'omit',
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const rawCode = data.details?.applicationError?.code || '';
        if (/captcha/i.test(rawCode) || /captcha/i.test(data.message || '')) {
          throw new WixFormError('Wix requires a verification step. Your message was not sent. Please email us directly for now.', 'CAPTCHA_REQUIRED');
        }
        throw new WixFormError('Your message could not be sent. Please try again or email us directly.', 'WIX_REJECTED');
      }
      return data;
    } catch (error) {
      if (error instanceof WixFormError) throw error;
      throw new WixFormError('We could not confirm delivery. Please try again later or email us directly.', 'NETWORK_ERROR');
    } finally {
      clearTimeout(timer);
    }
  }

  async function getVisitorToken() {
    if (visitorSession && visitorSession.expiresAt > Date.now() + 60000) {
      return visitorSession.token;
    }
    if (!authenticating) {
      authenticating = request('/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, grantType: 'anonymous' }),
      }).then(data => {
        if (!data.access_token || !Number.isFinite(Number(data.expires_in))) {
          throw new WixFormError('The contact form could not connect. Please email us directly.', 'INVALID_AUTH_RESPONSE');
        }
        visitorSession = {
          token: data.access_token,
          expiresAt: Date.now() + Number(data.expires_in) * 1000,
        };
        return visitorSession.token;
      }).finally(() => { authenticating = undefined; });
    }
    return authenticating;
  }

  return async function submitContact({ name, email, message }) {
    if (!clientId || !formId || !fieldKeys?.name || !fieldKeys?.email || !fieldKeys?.message) {
      throw new WixFormError('The contact form is being connected. Please email us directly for now.', 'NOT_CONFIGURED');
    }
    const values = { name: name?.trim(), email: email?.trim(), message: message?.trim() };
    if (!values.name || !values.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email || '')) {
      throw new WixFormError('Please enter your name, a valid email address, and a message.', 'INVALID_INPUT');
    }
    const token = await getVisitorToken();
    // Do not automatically retry a submission: a timeout can happen after Wix saves it.
    const result = await request('/form-submission-service/v4/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify({ submission: {
        formId,
        submissions: {
          [fieldKeys.name]: values.name,
          [fieldKeys.email]: values.email,
          [fieldKeys.message]: values.message,
        },
      } }),
    });
    const submission = result.submission;
    const receiptId = submission?.id || submission?._id;
    // Wix Forms uses CONFIRMED as its default. Some serialized receipts omit
    // that default; accept omission only for this exact form and namespace.
    const confirmed = submission?.status === 'CONFIRMED' || (
      submission?.status === undefined && submission?.formId === formId
      && submission?.namespace === 'wix.form_app.form'
    );
    if (!receiptId || !confirmed || (submission.formId && submission.formId !== formId)) {
      throw new WixFormError('Wix accepted the request, but delivery could not be confirmed here. Please avoid sending it again; email us if you need help.', 'UNCONFIRMED');
    }
    return { id: receiptId };
  };
}
