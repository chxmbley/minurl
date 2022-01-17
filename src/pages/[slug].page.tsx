import { findUrlFromSlug } from '~lib/db/minifiedUrl';
import { createRedirectEntry } from '~lib/db/redirect';
import type { AddressInfo } from 'net';
import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps<{}, { slug: string }> = async (ctx) => {
  const slug = ctx.params?.slug;
  const destination = await findUrlFromSlug(slug);

  // No redirect destination matching the slug found in database
  if (destination === null) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // Attempt to parse an IP address from X-Real-IP HTTP header
  const rawRealIpHeaders = ctx.req.headers['x-real-ip'];
  const realIpHeader = Array.isArray(rawRealIpHeaders)
    ? rawRealIpHeaders[rawRealIpHeaders.length - 1]
    : rawRealIpHeaders;

  const ipAddress = realIpHeader ?? (ctx.req.connection.address() as AddressInfo).address ?? null;
  const userAgent = ctx.req.headers['user-agent'] ?? null;

  // Log redirect in database
  await createRedirectEntry(ipAddress, userAgent, slug!);

  return {
    redirect: {
      destination,
      permanent: false,
    },
  };
};

// Page files require a React component default export; this one will never be rendered as we will always redirect
const nullPage = () => null;

export default nullPage;
