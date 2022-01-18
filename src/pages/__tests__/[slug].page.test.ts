import { getServerSideProps } from '~pages/[slug].page';
import * as minifiedUrlDbUtils from '~lib/db/minifiedUrl';
import * as redirectDbUtils from '~lib/db/redirect';
import { createRedirectEntry } from '~lib/db/redirect';

const MOCK_URL = 'https://google.com';
const MOCK_SLUG = 'abc123';
const MOCK_IPADDR = '123.45.67.8';
const MOCK_USER_AGENT = 'user agent';
const MOCK_ADDRESS = jest.fn().mockReturnValue({ address: MOCK_IPADDR });

const MOCK_CONTEXT = {
  params: { slug: MOCK_SLUG },
  req: {
    connection: {
      address: MOCK_ADDRESS,
    },
    headers: {
      'x-real-ip': MOCK_IPADDR,
      'user-agent': MOCK_USER_AGENT,
    },
  },
};

const findUrlFromSlugSpy = jest.spyOn(minifiedUrlDbUtils, 'findUrlFromSlug').mockResolvedValue(MOCK_URL);
const createRedirectEntrySpy = jest.spyOn(redirectDbUtils, 'createRedirectEntry').mockResolvedValue();

afterEach(() => {
  findUrlFromSlugSpy.mockClear();
  createRedirectEntrySpy.mockClear();
  MOCK_ADDRESS.mockClear();
});

test('saves request info in database and redirects to full URL when destination is found', async () => {
  // @ts-ignore
  const { redirect } = await getServerSideProps(MOCK_CONTEXT);

  expect(redirect).toStrictEqual({
    destination: MOCK_URL,
    permanent: false,
  });

  expect(findUrlFromSlugSpy).toHaveBeenCalledTimes(1);
  expect(findUrlFromSlugSpy).toHaveBeenCalledWith(MOCK_SLUG);
  expect(MOCK_ADDRESS).not.toHaveBeenCalled();
  expect(createRedirectEntrySpy).toHaveBeenCalledTimes(1);
  expect(createRedirectEntrySpy).toHaveBeenCalledWith(MOCK_IPADDR, MOCK_USER_AGENT, MOCK_SLUG);
});

test('redirects to the home page without logging request if no URL is associated with the slug', async () => {
  findUrlFromSlugSpy.mockResolvedValueOnce(null);

  // @ts-ignore
  const { redirect } = await getServerSideProps(MOCK_CONTEXT);

  expect(redirect).toStrictEqual({
    destination: '/',
    permanent: false,
  });

  expect(findUrlFromSlugSpy).toHaveBeenCalledTimes(1);
  expect(findUrlFromSlugSpy).toHaveBeenCalledWith(MOCK_SLUG);
  expect(MOCK_ADDRESS).not.toHaveBeenCalled();
  expect(createRedirectEntrySpy).not.toHaveBeenCalled();
});

test('parses request IP address from the last x-real-ip header if multiple exist', async () => {
  const multipleIpHeaderContext = {
    params: { slug: MOCK_SLUG },
    req: {
      connection: MOCK_CONTEXT.req.connection,
      headers: {
        'x-real-ip': ['127.0.0.1', '0.0.0.0', '8.8.8.8', MOCK_IPADDR],
        'user-agent': MOCK_USER_AGENT,
      },
    },
  };
  // @ts-ignore
  const { redirect } = await getServerSideProps(multipleIpHeaderContext);

  expect(redirect).toStrictEqual({
    destination: MOCK_URL,
    permanent: false,
  });

  expect(findUrlFromSlugSpy).toHaveBeenCalledTimes(1);
  expect(findUrlFromSlugSpy).toHaveBeenCalledWith(MOCK_SLUG);
  expect(MOCK_ADDRESS).not.toHaveBeenCalled();
  expect(createRedirectEntrySpy).toHaveBeenCalledTimes(1);
  expect(createRedirectEntrySpy).toHaveBeenCalledWith(MOCK_IPADDR, MOCK_USER_AGENT, MOCK_SLUG);
});

test('parses request IP address from connection if no x-real-ip header exists', async () => {
  const noIpHeaderContext = {
    params: { slug: MOCK_SLUG },
    req: {
      connection: MOCK_CONTEXT.req.connection,
      headers: {
        'user-agent': MOCK_USER_AGENT,
      },
    },
  };

  // @ts-ignore
  const { redirect } = await getServerSideProps(noIpHeaderContext);

  expect(redirect).toStrictEqual({
    destination: MOCK_URL,
    permanent: false,
  });

  expect(findUrlFromSlugSpy).toHaveBeenCalledTimes(1);
  expect(findUrlFromSlugSpy).toHaveBeenCalledWith(MOCK_SLUG);
  expect(MOCK_ADDRESS).toHaveBeenCalledTimes(1);
  expect(createRedirectEntrySpy).toHaveBeenCalledTimes(1);
  expect(createRedirectEntrySpy).toHaveBeenCalledWith(MOCK_IPADDR, MOCK_USER_AGENT, MOCK_SLUG);
});

test('saves a null IP address to database if IP address cannot be determined from request', async () => {
  MOCK_ADDRESS.mockReturnValueOnce({});

  const noIpContext = {
    params: { slug: MOCK_SLUG },
    req: {
      connection: MOCK_CONTEXT.req.connection,
      headers: {
        'user-agent': MOCK_USER_AGENT,
      },
    },
  };

  // @ts-ignore
  const { redirect } = await getServerSideProps(noIpContext);

  expect(redirect).toStrictEqual({
    destination: MOCK_URL,
    permanent: false,
  });

  expect(findUrlFromSlugSpy).toHaveBeenCalledTimes(1);
  expect(findUrlFromSlugSpy).toHaveBeenCalledWith(MOCK_SLUG);
  expect(MOCK_ADDRESS).toHaveBeenCalledTimes(1);
  expect(createRedirectEntrySpy).toHaveBeenCalledTimes(1);
  expect(createRedirectEntrySpy).toHaveBeenCalledWith(null, MOCK_USER_AGENT, MOCK_SLUG);
});

test('saves a null user agent to database if user agent cannot be determined from request', async () => {
  const noUserAgentContext = {
    params: { slug: MOCK_SLUG },
    req: {
      connection: MOCK_CONTEXT.req.connection,
      headers: {},
    },
  };

  // @ts-ignore
  const { redirect } = await getServerSideProps(noUserAgentContext);

  expect(redirect).toStrictEqual({
    destination: MOCK_URL,
    permanent: false,
  });

  expect(findUrlFromSlugSpy).toHaveBeenCalledTimes(1);
  expect(findUrlFromSlugSpy).toHaveBeenCalledWith(MOCK_SLUG);
  expect(MOCK_ADDRESS).toHaveBeenCalledTimes(1);
  expect(createRedirectEntrySpy).toHaveBeenCalledTimes(1);
  expect(createRedirectEntrySpy).toHaveBeenCalledWith(MOCK_IPADDR, null, MOCK_SLUG);
});

test('redirects as expected if a failure occurs while saving request information to database', async () => {
  const consoleErrorSpy = jest.spyOn(console, 'error');
  const mockError = new Error('mock error');

  createRedirectEntrySpy.mockRejectedValueOnce(mockError);

  // @ts-ignore
  const { redirect } = await getServerSideProps(MOCK_CONTEXT);

  expect(redirect).toStrictEqual({
    destination: MOCK_URL,
    permanent: false,
  });

  expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);
});
