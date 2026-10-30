# Contact form → Wix Forms

The website keeps its existing React form. It authenticates as an anonymous
visitor and posts name, email, and message to Wix Forms. No admin API key,
client secret, new npm dependencies, or separate backend is used.

Wix form: Contact from Visitor — Website
Form ID: 3791a793-81c7-42e9-8035-fb8abf01f632
Site ID: f543d67d-3314-4228-9da2-c15a46cca318
Field targets: first_name, email, message. Each is a required string.
The legacy Contact from Visitor form and its submissions remain separate.

## Configuration

1. Wix dashboard → Settings → Headless settings. Use a visitor/member OAuth
   client for this existing site. Copy its public client ID.
2. Copy .env.example to .env.local and fill VITE_WIX_CLIENT_ID. Never put
   client secrets or admin API keys into VITE_ variables: Vite bundles them
   into publicly downloadable JavaScript.
3. Restart the Vite development server. Vite reads env values at startup/build.
4. In GitHub Actions set the same two variables in the build step's environment
   before npm run build. GitHub Pages serves static files and cannot load .env
   from the server at runtime. The form ID/client ID are public configuration.

## Before publishing

- Verify the actual form schema with Wix's Get Form API and the configured
  visitor client. Keys must be field targets, not field IDs or display labels.
- Submit a clearly labeled test message and verify that it appears in the
  current Wix form's submissions. A mock test does not establish live delivery.
- Confirm notifications/automations separately; recording a form submission
  does not prove that an email notification was sent.
- Keep Wix's spam protection enabled. If Wix requires CAPTCHA, the adapter
  reports that the message was not sent. A supported external verification
  flow still needs integration before this can be considered production ready.
  Do not disable spam filters to make a test succeed.
- Test from the deployed origin and with browser/network errors. In-memory
  visitor tokens expire naturally; no personal message content is persisted.

## Behavior

Only a Wix receipt with a submission ID and confirmed status clears the fields
and displays success. An omitted status is accepted only with this exact form
ID and the Wix Forms namespace, whose documented default is CONFIRMED. Failed
requests preserve the inputs. Requests time out
after 15 seconds. Submissions are never automatically retried because delivery
may already have occurred before a timeout. The UI blocks double submissions.

## Checks

node --test tests/wixForms.test.mjs
npm run build

The tests mock Wix to cover field mapping, anonymous auth, token reuse, pending
responses, CAPTCHA requirements, and invalid configuration/input. Live delivery
and CAPTCHA are separate checks.

## References

## Verification on October 29, 2026

- Created and saved the modern form and a public visitor OAuth client.
- Verified anonymous authentication and read the form schema using Wix APIs.
- Sent ONE approved test through the React form. Verified its name, email, and
  message in the new Wix form's dashboard submissions. No second test was sent.
- The first browser test displayed an unconfirmed-delivery message despite the
  Wix record. The response parser was updated to support alternative receipt ID
  serialization and documented default-confirmed status, with regression tests.
  The raw response from that first request was not captured, so the parser
  change has NOT been verified with another live submission. Do not describe
  the final browser success state as end-to-end tested.
- Automatic email notification delivery has not been verified.
- CAPTCHA-required cases are reported honestly; no external CAPTCHA challenge
  UI is implemented yet. Existing Wix spam protection was left enabled.

## References

- https://dev.wix.com/docs/go-headless/authentication/visitors/authenticate-visitors-rest
- https://dev.wix.com/docs/api-reference/crm/forms/form-submissions/submission-object
- https://dev.wix.com/docs/go-headless/self-managed-headless/get-started/add-a-frontend-to-an-existing-wix-site
