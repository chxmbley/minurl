import * as client from '~lib/db/client';
import clientMock from '~lib/db/__mocks__/client';
import * as utils from '~lib/utils';
import { createRedirectEntry } from '~lib/db/redirect';

// @ts-ignore
client.default = clientMock;

describe('createRedirectEntry', () => {
  const MOCK_HASH_VALUE = 'mockhashvalue';
  const md5HashSpy = jest.spyOn(utils, 'md5Hash').mockReturnValue(MOCK_HASH_VALUE);

  afterEach(() => {
    md5HashSpy.mockClear();
    clientMock.redirect.create.mockClear();
  });

  test('creates a redirect entry using given IP address, user agent string, and URL slug', async () => {
    const ipAddress = '123.45.67.8';
    const userAgent = 'test user agent';
    const slug = 'abc123';

    await createRedirectEntry(ipAddress, userAgent, slug);
    expect(md5HashSpy).toHaveBeenCalledTimes(1);
    expect(md5HashSpy).toHaveBeenCalledWith(ipAddress);
    expect(clientMock.redirect.create).toHaveBeenCalledTimes(1);
    expect(clientMock.redirect.create).toHaveBeenCalledWith({
      data: { ipAddressHash: MOCK_HASH_VALUE, userAgent, url: { connect: { slug } } },
    });
  });

  test('creates a redirect entry with null IP address, null user agent string, and provided URL slug', async () => {
    const slug = 'abc123';
    await createRedirectEntry(null, null, slug);
    expect(md5HashSpy).not.toHaveBeenCalled();
    expect(clientMock.redirect.create).toHaveBeenCalledWith({
      data: { ipAddressHash: null, userAgent: null, url: { connect: { slug } } },
    });
  });
});
