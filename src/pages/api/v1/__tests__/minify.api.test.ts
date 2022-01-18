import StatusCodes from 'http-status-codes';
import { times } from 'lodash';
import handler from '~pages/api/v1/minify.api';
import * as urlUtils from '~lib/utils/url';
import * as minifiedUrlDbUtils from '~lib/db/minifiedUrl';
import type { NextApiRequest } from 'next';

const MOCK_SLUG = 'abc123';
const MOCK_RESPONSE_END = jest.fn();
const MOCK_RESPONSE_JSON = jest.fn();

const MOCK_RESPONSE = {
  status: jest.fn().mockReturnValue({
    end: MOCK_RESPONSE_END,
    json: MOCK_RESPONSE_JSON,
  }),
  json: MOCK_RESPONSE_JSON,
};

const isValidUrlSpy = jest.spyOn(urlUtils, 'isValidUrl').mockReturnValue(true);
const findOrCreateMinifiedUrlSlugSpy = jest
  .spyOn(minifiedUrlDbUtils, 'findOrCreateMinifiedUrlSlug')
  .mockResolvedValue(MOCK_SLUG);

const getMockRequestData = (url: string, method: string) =>
  ({
    method,
    body: { url },
  } as NextApiRequest);

afterEach(() => {
  isValidUrlSpy.mockClear();
  findOrCreateMinifiedUrlSlugSpy.mockClear();
  MOCK_RESPONSE.status.mockClear();
  MOCK_RESPONSE_END.mockClear();
  MOCK_RESPONSE_JSON.mockClear();
  MOCK_RESPONSE_JSON.mockClear();
});

test('minifies a URL and returns the URL slug in a JSON response', async () => {
  const url = 'https://google.com';

  // @ts-ignore
  await handler(getMockRequestData(url, 'POST'), MOCK_RESPONSE);

  expect(isValidUrlSpy).toHaveBeenCalledTimes(1);
  expect(isValidUrlSpy).toHaveBeenCalledWith(url);
  expect(findOrCreateMinifiedUrlSlugSpy).toHaveBeenCalledTimes(1);
  expect(findOrCreateMinifiedUrlSlugSpy).toHaveBeenCalledWith(url);
  expect(MOCK_RESPONSE_JSON).toHaveBeenCalledTimes(1);
  expect(MOCK_RESPONSE_JSON).toHaveBeenCalledWith({
    ok: true,
    message: 'SUCCESS',
    data: {
      slug: MOCK_SLUG,
    },
  });
});

test('rejects HTTP methods other than POST requests', async () => {
  const url = 'https://google.com';
  const methods = ['GET', 'PUT', 'HEAD', 'DELETE'];

  await Promise.all(
    methods.map((method) =>
      // @ts-ignore
      handler(getMockRequestData(url, method), MOCK_RESPONSE),
    ),
  );

  // @ts-ignore
  await expect(isValidUrlSpy).not.toHaveBeenCalled();
  expect(findOrCreateMinifiedUrlSlugSpy).not.toHaveBeenCalled();
  expect(MOCK_RESPONSE_JSON).not.toHaveBeenCalled();
  expect(MOCK_RESPONSE.status).toHaveBeenCalledTimes(methods.length);
  expect(MOCK_RESPONSE_END).toHaveBeenCalledTimes(methods.length);

  times(methods.length, (i) => {
    expect(MOCK_RESPONSE.status).toHaveBeenNthCalledWith(i + 1, StatusCodes.METHOD_NOT_ALLOWED);
  });
});

test('rejects invalid URLs', async () => {
  const url = 'https:google.com';
  isValidUrlSpy.mockReturnValueOnce(false);

  // @ts-ignore
  await handler(getMockRequestData(url, 'POST'), MOCK_RESPONSE);

  expect(isValidUrlSpy).toHaveBeenCalledTimes(1);
  expect(isValidUrlSpy).toHaveBeenCalledWith(url);
  expect(findOrCreateMinifiedUrlSlugSpy).not.toHaveBeenCalled();
  expect(MOCK_RESPONSE.status).toHaveBeenCalledTimes(1);
  expect(MOCK_RESPONSE.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
  expect(MOCK_RESPONSE_JSON).toHaveBeenCalledTimes(1);
  expect(MOCK_RESPONSE_JSON).toHaveBeenCalledWith({
    ok: false,
    message: 'INVALID_INPUT_URL',
    data: null,
  });
});
