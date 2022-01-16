import RandExp from 'randexp';
import { APP_BASE_URL } from '~lib/constants';

/**
 * Generates a random alphanumeric slug.
 * @param length - Number of characters in the resulting string. Default value is 6.
 * Throws an error if the length is less than 3 or greater than 32.
 */
export const generateRandomSlug = (length = 6): string => {
  if (length < 3 || length > 32) {
    throw new Error('Length must be between 3 and 32');
  }

  const slugRegex = new RegExp(`[a-z0-9]{${length}}`, 'i');
  return new RandExp(slugRegex).gen();
};

/**
 * Returns a boolean whether the provided URL is valid. URL must begin with http(s) protocol.
 * @param url - URL to test
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
  } catch (_) {
    return false;
  }

  return /^http(s)?:\/\//i.test(url);
};

/**
 * Constructs a minified URL using the configured base URL and provided slug
 * @param slug - The URL slug to append to the base URL
 */
export const constructMiniUrlFromSlug = (slug: string): string => `${APP_BASE_URL}/${slug}`;

/**
 * Checks whether a provided URL is an app redirect URL. That is, a URL that may be used by this
 * application to host a redirect. Note that this function does not check whether the URL exists.
 * @param url - URL to test
 */
export const isAppRedirectUrl = (url: string): boolean => {
  try {
    const { host, pathname } = new URL(url);
    return host === new URL(APP_BASE_URL).host && /^\/[a-z0-9]+$/i.test(pathname);
  } catch (_) {
    return false;
  }
};
