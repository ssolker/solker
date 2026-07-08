/**
 * Wedding guest details form API base URL.
 * - Dev server (`astro dev`): prefers PUBLIC_WEDDING_FORMS_API_URL_DEV, then PUBLIC_WEDDING_FORMS_API_URL.
 * - Production build: PUBLIC_WEDDING_FORMS_API_URL only.
 */
export function getWeddingFormsApiUrl(): string {
  if (import.meta.env.DEV) {
    return (
      import.meta.env.PUBLIC_WEDDING_FORMS_API_URL_DEV ||
      import.meta.env.PUBLIC_WEDDING_FORMS_API_URL ||
      ''
    );
  }
  return import.meta.env.PUBLIC_WEDDING_FORMS_API_URL || '';
}

export { getRecaptchaSiteKeyV3, getRecaptchaSiteKeyV2, hasRecaptchaSiteKey } from './publicForms';
