import { getMemoRecords } from '../../src/storage';
import type { NextApiRequest, NextApiResponse } from 'next'
const { WebClient } = require('@slack/web-api');

const token = process.env.SLACK_BOT_TOKEN;
const web = new WebClient(token);

const uploadFile = async ({
  filePath,
  fileName,
  channels,
  initialComment = ''
}: {
  filePath: string,
  fileName: string,
  channels: string,
  initialComment?: string
}) => {
  const res = await web.files.upload({
    file: filePath,  // also accepts Buffer or ReadStream
    filename: fileName,
    channels,
    initial_comment: initialComment || 'Here is the new company logo',
  });

  console.log('file upload res: ', res);
  console.log('File uploaded: ', res.file.id);
  return res;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("req.body: ", req.body);
    // const res = await uploadFile({
    //   fileName: 'test.json',
    //   filePath: '../../src/files/test.json',
    //   channels: ''
    // })
    res.status(200).json({status: true});
  } catch (e) {
    res.status(200);
  }
}