import * as client from '~lib/db/client';
import clientMock from '~lib/db/__mocks__/client';
import { findOrCreateMinifiedUrlSlug, findUrlFromSlug } from '~lib/db/minifiedUrl';
import * as urlUtils from '~lib/utils/url';

// @ts-ignore
client.default = clientMock;

const cleanupClientMock = () => {
  clientMock.$connect.mockClear();
  clientMock.$disconnect.mockClear();
  clientMock.minifiedUrl.create.mockClear();
  clientMock.minifiedUrl.findFirst.mockClear();
};

describe('findOrCreateMinifiedUrlSlug', () => {
  const MOCK_GENERATED_SLUG = 'foobar';
  const generateRandomSlugSpy = jest.spyOn(urlUtils, 'generateRandomSlug').mockReturnValue(MOCK_GENERATED_SLUG);

  afterEach(() => {
    generateRandomSlugSpy.mockClear();
    cleanupClientMock();
  });

  test('returns a slug if a URL is found in the database which matches the input URL', async () => {
    const url = 'https://google.com';
    const slug = 'foundurl';

    clientMock.minifiedUrl.findFirst.mockResolvedValueOnce({ slug });

    expect(await findOrCreateMinifiedUrlSlug(url)).toBe(slug);
    expect(clientMock.$connect).toHaveBeenCalledTimes(1);
    expect(clientMock.$disconnect).toHaveBeenCalledTimes(1);
    expect(clientMock.minifiedUrl.create).not.toHaveBeenCalled();
    expect(clientMock.minifiedUrl.findFirst).toHaveBeenCalledTimes(1);
    expect(clientMock.minifiedUrl.findFirst).toHaveBeenCalledWith({ where: { url }, select: { slug: true } });
  });

  test('returns a new slug if a URL is not found in the database which matches the input URL', async () => {
    const url = 'https://google.com';

    clientMock.minifiedUrl.findFirst.mockResolvedValueOnce(null);

    expect(await findOrCreateMinifiedUrlSlug(url)).toBe(MOCK_GENERATED_SLUG);
    expect(clientMock.$connect).toHaveBeenCalledTimes(1);
    expect(clientMock.$disconnect).toHaveBeenCalledTimes(1);
    expect(clientMock.minifiedUrl.create).toHaveBeenCalledTimes(1);
    expect(clientMock.minifiedUrl.create).toHaveBeenCalledWith({ data: { url, slug: MOCK_GENERATED_SLUG } });
    expect(clientMock.minifiedUrl.findFirst).toHaveBeenCalledTimes(1);
    expect(clientMock.minifiedUrl.findFirst).toHaveBeenCalledWith({ where: { url }, select: { slug: true } });
  });
});

describe('findUrlFromSlug', () => {
  afterEach(() => {
    cleanupClientMock();
  });

  test('returns null if no slug is provided', async () => {
    expect(await findUrlFromSlug()).toBeNull();
  });

  test('returns a URL when an entry matches the provided slug', async () => {
    const slug = 'foobar';
    const url = 'https://google.com';

    clientMock.minifiedUrl.findFirst.mockResolvedValueOnce({ url });

    expect(await findUrlFromSlug(slug)).toBe(url);
    expect(clientMock.$connect).toHaveBeenCalledTimes(1);
    expect(clientMock.$disconnect).toHaveBeenCalledTimes(1);
    expect(clientMock.minifiedUrl.findFirst).toHaveBeenCalledTimes(1);
    expect(clientMock.minifiedUrl.findFirst).toHaveBeenCalledWith({ where: { slug }, select: { url: true } });
  });

  test('returns null when no entry matches the provided slug', async () => {
    const slug = 'foobar';

    clientMock.minifiedUrl.findFirst.mockResolvedValueOnce({ url: null });

    expect(await findUrlFromSlug(slug)).toBeNull();
    expect(clientMock.$connect).toHaveBeenCalledTimes(1);
    expect(clientMock.$disconnect).toHaveBeenCalledTimes(1);
    expect(clientMock.minifiedUrl.findFirst).toHaveBeenCalledTimes(1);
    expect(clientMock.minifiedUrl.findFirst).toHaveBeenCalledWith({ where: { slug }, select: { url: true } });
  });
});
