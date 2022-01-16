import { getRandomElement } from '~lib/utils/index';
import { LONG_INPUT_URL_MESSAGES, OUTPUT_URL_MESSAGES, SHORT_INPUT_URL_MESSAGES } from '~lib/constants';

/**s
 * Selects a random message to display for an input URL.
 * The length of the provided URL determines which list of messages the resulting message is selected from.
 * @param url - Input URL for which to generate a message
 */
export const getRandomInputUrlMessage = (url: string): string => {
  const messageList = url.length < 45 ? SHORT_INPUT_URL_MESSAGES : LONG_INPUT_URL_MESSAGES;
  return getRandomElement(messageList);
};

/**
 * Selects a random message to display for an output (shortened) URL.
 */
export const getRandomOutputUrlMessage = (): string => getRandomElement(OUTPUT_URL_MESSAGES);
