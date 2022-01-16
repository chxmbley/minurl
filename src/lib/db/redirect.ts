import { md5Hash } from '~lib/utils';
import client from './client';

/**
 * Saves redirect information to the database
 * @param ipAddress - IP address of the requester. This value will be hashed before being written to the database.
 * @param userAgent - User agent string of the request.
 * @param slug - Slug of the original URL being redirected.
 */
export const createRedirectEntry = async (ipAddress: string | null, userAgent: string | null, slug: string) => {
  // Hash IP address if provided to anonymize request
  const ipAddressHash = ipAddress === null ? null : md5Hash(ipAddress);
  await client.redirect.create({ data: { ipAddressHash, userAgent, url: { connect: { slug } } } });
};
