import { NextApiHandler } from 'next';
import StatusCodes from 'http-status-codes';
import { isValidUrl } from '~lib/utils';
import { findOrCreateMinifiedUrlSlug } from '~lib/db/minifiedUrl';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
    return;
  }

  const { url } = req.body;

  if (!isValidUrl(url)) {
    res.status(StatusCodes.BAD_REQUEST).json({ ok: false, message: 'INVALID_INPUT_URL', data: null });
    return;
  }

  const slug = await findOrCreateMinifiedUrlSlug(url);

  res.json({
    ok: true,
    message: 'SUCCESS',
    data: { slug },
  });
};

export default handler;
