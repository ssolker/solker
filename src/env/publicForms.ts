/**
 * League forms API base URL.
 * - Dev server (`astro dev`): prefers PUBLIC_FORMS_API_URL_DEV, then PUBLIC_FORMS_API_URL.
 * - Production build: PUBLIC_FORMS_API_URL only (never _DEV).
 */
export function getFormsApiUrl(): string {
  if (import.meta.env.DEV) {
    return import.meta.env.PUBLIC_FORMS_API_URL_DEV || import.meta.env.PUBLIC_FORMS_API_URL || '';
  }
  return import.meta.env.PUBLIC_FORMS_API_URL || '';
}

/** reCAPTCHA v3 site key (`grecaptcha.execute`, `api.js?render=`). */
export function getRecaptchaSiteKeyV3(): string {
  return import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY_V3 || '';
}

/** reCAPTCHA v2 site key (checkbox widget); pair with `RECAPTCHA_SECRET` on the API. */
export function getRecaptchaSiteKeyV2(): string {
  return import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY || '';
}

/** Same as {@link getRecaptchaSiteKeyV3} (primary execute key). */
export function getRecaptchaSiteKey(): string {
  return getRecaptchaSiteKeyV3();
}

export function hasRecaptchaSiteKey(): boolean {
  return !!(getRecaptchaSiteKeyV3() || getRecaptchaSiteKeyV2());
}
