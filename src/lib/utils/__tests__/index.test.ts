import crypto from 'crypto';
import { getRandomElement, md5Hash } from '~lib/utils';
import { expect } from '@jest/globals';

describe('md5Hash', () => {
  const MOCKED_HASH_VALUE = '5eb63bbbe01eeed093cb22bb8f5acdc3';
  const mockHashDigestFn = jest.fn().mockReturnValue(MOCKED_HASH_VALUE);
  const mockHashUpdateFn = jest.fn().mockReturnValue({ digest: mockHashDigestFn });

  // @ts-ignore
  const createHashSpy = jest.spyOn(crypto, 'createHash').mockReturnValue({
    update: mockHashUpdateFn,
  });

  afterEach(() => {
    mockHashDigestFn.mockClear();
    mockHashUpdateFn.mockClear();
    createHashSpy.mockClear();
  });

  test('creates an MD5 hash from an input and returns the value in hexadecimal format', () => {
    const hashInput = 'test string';
    const hash = md5Hash(hashInput);
    expect(hash).toBe(MOCKED_HASH_VALUE);
    expect(createHashSpy).toHaveBeenCalledTimes(1);
    expect(createHashSpy).toHaveBeenCalledWith('md5');
    expect(mockHashUpdateFn).toHaveBeenCalledTimes(1);
    expect(mockHashUpdateFn).toHaveBeenCalledWith(hashInput);
    expect(mockHashDigestFn).toHaveBeenCalledTimes(1);
    expect(mockHashDigestFn).toHaveBeenCalledWith('hex');
  });
});

describe('getRandomElement', () => {
  test('returns a random element from the provided array', () => {
    const arr = [12, 34, 56, 78, 90];
    const element = getRandomElement(arr);
    expect(arr).toContain(element);
  });
});
