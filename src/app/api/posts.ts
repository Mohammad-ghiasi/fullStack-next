import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    res.statusCode = 400;
    res.json({});
  }

  if (req.method === 'POST') {
    return res.json({});
  }

  if (req.method === 'PUT') {
    return res.json({});
  }

  if (req.method === 'DELETE') {
    return res.json({});
  }

  return res.json({});
}
