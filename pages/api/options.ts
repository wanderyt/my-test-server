import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const options = {
    "options": [
      {
        "text": {
          "type": "plain_text",
          "text": "*this is plain_text text*"
        },
        "value": "value-0"
      },
      {
        "text": {
          "type": "plain_text",
          "text": "*this is plain_text text*"
        },
        "value": "value-1"
      },
      {
        "text": {
          "type": "plain_text",
          "text": "*this is plain_text text*"
        },
        "value": "value-2"
      }
    ]
  };
  res.status(200).json(options);
}