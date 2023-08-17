import type { NextApiRequest, NextApiResponse } from 'next'
import { SlackMessageRequest } from '../../src/utils/slack-message';
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
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("req.body: ", req.body);
    const body = req.body as SlackMessageRequest;
    // const res = await uploadFile({
    //   fileName: 'test.json',
    //   filePath: '../../src/files/test.json',
    //   channels: body.channel_id
    // })
    uploadFile({
      fileName: 'test.json',
      filePath: '../../src/files/test.json',
      channels: body.channel_id
    }).then((res) => {
      res.status(200).json({status: true});
    }).catch(e => {
      console.log("error: ", e);
      res.status(500)
    })
  } catch (e) {
    res.status(500);
  }
}