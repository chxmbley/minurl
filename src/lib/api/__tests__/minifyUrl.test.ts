import axios from 'axios';
import { minifyUrl } from '~lib/api/minifyUrl';
import { MINIFY_ENDPOINT } from '~lib/api/constants';

const MOCK_API_RESPONSE = { foo: 'bar' };
const MOCK_API_RESPONSE_RESPONSE = { data: MOCK_API_RESPONSE };

test('sends a POST request to the minify API endpoint and returns the response payload', async () => {
  // @ts-ignore
  axios.post.mockResolvedValueOnce({ data: MOCK_API_RESPONSE_RESPONSE });
  const url = 'https://google.com';
  expect(await minifyUrl(url)).toBe(MOCK_API_RESPONSE);
  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(axios.post).toHaveBeenCalledWith(MINIFY_ENDPOINT, { url });
});
