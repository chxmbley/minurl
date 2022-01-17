import axios from 'axios';
import { MINIFY_ENDPOINT } from '~lib/api/constants';
import type { MinifyUrlApiResponse, MinifyUrlApiResponseData } from './types';

/**
 * Sends a request to the API endpoint responsible for minifying the given URL
 * @param url - URL to minify
 */
export const minifyUrl = async (url: string): Promise<MinifyUrlApiResponseData> => {
  const { data } = await axios.post<MinifyUrlApiResponse>(MINIFY_ENDPOINT, { url });
  return data.data;
};
