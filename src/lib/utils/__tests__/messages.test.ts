import * as utils from '~lib/utils';
import { LONG_INPUT_URL_MESSAGES, OUTPUT_URL_MESSAGES, SHORT_INPUT_URL_MESSAGES } from '~lib/constants';
import { getRandomInputUrlMessage, getRandomOutputUrlMessage } from '~lib/utils/messages';

const MOCKED_RANDOM_ELEMENT_RETURN_VALUE = 'foo';
const getRandomElementSpy = jest.spyOn(utils, 'getRandomElement').mockReturnValue(MOCKED_RANDOM_ELEMENT_RETURN_VALUE);

const cleanup = () => {
  getRandomElementSpy.mockClear();
};

describe('getRandomInputUrlMessage', () => {
  test('returns a message from the SHORT_INPUT_URL_MESSAGES array when the URL is less than 45 characters in length', () => {
    const url = 'https://short.co/smol-url';
    const message = getRandomInputUrlMessage(url);
    expect(url.length).toBeLessThan(45);
    expect(message).toBe(MOCKED_RANDOM_ELEMENT_RETURN_VALUE);
    expect(getRandomElementSpy).toHaveBeenCalledTimes(1);
    expect(getRandomElementSpy).toHaveBeenCalledWith(SHORT_INPUT_URL_MESSAGES);
    cleanup();
  });

  test('returns a message from the LONG_INPUT_URL_MESSAGES array when the URL is less than 45 characters in length', () => {
    const url =
      'https://this-is-a-verbose-url-for-testing-purposes-only.engineering/path/to/resource?testing=true&is-a-little-much=true';
    const message = getRandomInputUrlMessage(url);
    expect(url.length).toBeGreaterThan(45);
    expect(message).toBe(MOCKED_RANDOM_ELEMENT_RETURN_VALUE);
    expect(getRandomElementSpy).toHaveBeenCalledTimes(1);
    expect(getRandomElementSpy).toHaveBeenCalledWith(LONG_INPUT_URL_MESSAGES);
    cleanup();
  });
});

describe('getRandomOutputUrlMessage', () => {
  test('returns a message from OUTPUT_URL_MESSAGES array', () => {
    const message = getRandomOutputUrlMessage();
    expect(message).toBe(MOCKED_RANDOM_ELEMENT_RETURN_VALUE);
    expect(getRandomElementSpy).toHaveBeenCalledTimes(1);
    expect(getRandomElementSpy).toHaveBeenCalledWith(OUTPUT_URL_MESSAGES);
    cleanup();
  });
});
