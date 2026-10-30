import { createWixContactService } from './wixForms.js';

export const submitContact = createWixContactService({
  clientId: import.meta.env.VITE_WIX_CLIENT_ID,
  formId: import.meta.env.VITE_WIX_CONTACT_FORM_ID,
  fieldKeys: { name: 'first_name', email: 'email', message: 'message' },
});
