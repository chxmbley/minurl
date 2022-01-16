import { APP_BASE_URL } from '~lib/constants';
import { constructMiniUrlFromSlug, generateRandomSlug, isAppRedirectUrl, isValidUrl } from '~lib/utils/url';

describe('generateRandomSlug', () => {
  const ALPHANUMERIC_REGEX = /[a-z0-9]+/i;
  const DEFAULT_SLUG_LENGTH = 6;

  test('generates a string of random numbers of a default length', () => {
    const slug = generateRandomSlug();
    expect(ALPHANUMERIC_REGEX.test(slug)).toBe(true);
    expect(slug).toHaveLength(DEFAULT_SLUG_LENGTH);
  });

  test('generates a string of random numbers of a specified length', () => {
    const slugLength = 12;
    const slug = generateRandomSlug(slugLength);
    expect(ALPHANUMERIC_REGEX.test(slug)).toBe(true);
    expect(slug).toHaveLength(slugLength);
  });

  test('throws an error when the specified length is too low', () => {
    expect(() => generateRandomSlug(2)).toThrow();
  });

  test('throws an error when the specified length is too high', () => {
    expect(() => generateRandomSlug(100)).toThrow();
  });
});

describe('isValidUrl', () => {
  test('returns true when provided a well-formatted URL', () => {
    const url = 'https://google.com/';
    expect(isValidUrl(url)).toBe(true);
  });

  test('returns true when provided a well-formatted URL with port, path query parameters, and anchor', () => {
    const url = 'https://google.com:1337/path/to/resource?foo=bar&abc=def#about';
    expect(isValidUrl(url)).toBe(true);
  });

  test('returns true when provided a well-formatted with an HTTP protocol', () => {
    const url = 'http://google.com/';
    expect(isValidUrl(url)).toBe(true);
  });

  test('returns true when provided a URL to an IP address with port', () => {
    const url = 'http://123.45.67.8:1337/';
    expect(isValidUrl(url)).toBe(true);
  });

  test('returns true when provided a URL to localhost', () => {
    const url = 'http://localhost/';
    expect(isValidUrl(url)).toBe(true);
  });

  test('returns false when provided a URL without a protocol', () => {
    const url = 'google.com';
    expect(isValidUrl(url)).toBe(false);
  });

  test('returns false when provided a URL with an incorrectly-formatted protocol', () => {
    const url = 'http:google.com';
    expect(isValidUrl(url)).toBe(false);
  });

  test('returns false when provided an empty string', () => {
    const url = '';
    expect(isValidUrl(url)).toBe(false);
  });

  test('returns false when provided a well-formatted URL with leading whitespace', () => {
    const url = ' https://google.com/';
    expect(isValidUrl(url)).toBe(false);
  });
});

describe('constructMiniUrlFromSlug', () => {
  test('constructs a URL from the configured base URL and the provided slug', () => {
    const slug = 'abc123';
    const url = constructMiniUrlFromSlug(slug);
    expect(url).toBe(`${APP_BASE_URL}/${slug}`);
  });
});

describe('isAppRedirectUrl', () => {
  test('returns true when the provided URL uses the configured base URL and an alphanumeric path', () => {
    const url = `${APP_BASE_URL}/abc123`;
    expect(isAppRedirectUrl(url)).toBe(true);
  });

  test('returns true when the provided URL uses the configured base URL and an alphanumeric path with query parameters', () => {
    const url = `${APP_BASE_URL}/abc123?foo=bar`;
    expect(isAppRedirectUrl(url)).toBe(true);
  });

  test('returns true when the provided URL uses the configured base URL and an alphanumeric path with anchor', () => {
    const url = `${APP_BASE_URL}/abc123#about`;
    expect(isAppRedirectUrl(url)).toBe(true);
  });

  test('returns false when the provided URL uses the configured base URL and a non-alphanumeric path', () => {
    const url = `${APP_BASE_URL}/@dashboard`;
    expect(isAppRedirectUrl(url)).toBe(false);
  });

  test('returns false when the provided URL uses the configured base URL and a path depth >= 2', () => {
    const url = `${APP_BASE_URL}/abc123/path`;
    expect(isAppRedirectUrl(url)).toBe(false);
  });

  test("returns false when the provided URL does not match the configured base URL's host", () => {
    const url = `https://google.com/abc123`;
    expect(isAppRedirectUrl(url)).toBe(false);
  });
});
