import { isNil } from 'lodash';
import { generateRandomSlug } from '~lib/utils/url';
import db from './client';

/**
 * Attempts to look up and return a slug for the provided URL. If no entry is found, one is created
 * and the new slug will be returned.
 * @param url - The URL to look up or add
 */
export const findOrCreateMinifiedUrlSlug = async (url: string): Promise<string> => {
  await db.$connect();

  try {
    const data = await db.minifiedUrl.findFirst({ where: { url }, select: { slug: true } });

    if (!isNil(data?.slug)) {
      return data!.slug;
    }

    // Else URL is new; assign a slug
    const slug = generateRandomSlug();
    await db.minifiedUrl.create({ data: { url, slug } });

    return slug;
  } finally {
    db.$disconnect();
  }
};

/**
 * Attempts to find a full URL given a slug value. If no URL is associated with the slug, this will return null.
 * @param slug - The slug by which to look up a full URL
 */
export const findUrlFromSlug = async (slug?: string): Promise<string | null> => {
  if (slug === undefined) {
    return null;
  }

  await db.$connect();
  const data = await db.minifiedUrl.findFirst({ where: { slug }, select: { url: true } });
  await db.$disconnect();
  return data?.url ?? null;
};
