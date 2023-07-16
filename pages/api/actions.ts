import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('actions: ',req.body);
  res.status(200).json({status: 'action received.'});
}