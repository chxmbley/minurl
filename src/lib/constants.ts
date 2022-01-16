/**
 * Base URL of the application. This is the URL to which shortened URL slugs will be appended.
 * The base URL will be read from the NEXT_PUBLIC_BASE_URL if available and fallback to the app URL
 * as determined by the Location object (client rendered only)
 */
export const APP_BASE_URL = (() => {
  const locationUrl = typeof window === 'undefined' ? '' : `${location.protocol}//${location.host}`;
  return process.env.NEXT_PUBLIC_BASE_URL ?? locationUrl;
})();

/**
 * List of display messages for short input URLs
 */
export const SHORT_INPUT_URL_MESSAGES = ["that's not *too* long...", 'hmm... already seems short to me', 'v smol url'];

/**
 * List of display messages for long input URLs
 */
export const LONG_INPUT_URL_MESSAGES = [
  'wow many large. such url.',
  'is that a real url or did a cat walk across your keyboard?',
  'thicc url alert',
  'more like www.toomanyletters.com amirite?',
  "back in my day, urls weren't a mile long",
];

/**
 * List of display messages for output URLs
 */
export const OUTPUT_URL_MESSAGES = [
  'much better',
  'sweet relief',
  'reject verbosity. embrace brevity.',
  'with mini urls comes great responsibility',
  'little url — big dreams',
  '*chef kiss*',
];
