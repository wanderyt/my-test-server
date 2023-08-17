import type { NextApiRequest, NextApiResponse } from 'next'
import { SlackMessageRequest } from '../../src/utils/slack-message';
import path from 'path';
const { WebClient } = require('@slack/web-api');
import fspromises from 'fs/promises';
import fs from 'fs';

const token = process.env.SLACK_MESSAGER_BOT_TOKEN;
const web = new WebClient(token);
const defaultFileUploadChannel = 'C05H9PJRM34';

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
  const res = await web.files.uploadV2({
    file: '',  // also accepts Buffer or ReadStream
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

    console.log("current path: ", __dirname);
    console.log("current cwd: ", process.cwd());
    const filePath = path.join(process.cwd(), 'src', 'files', 'test.json')

    const fsExist = await fspromises.stat(filePath);
    const isExist = fs.existsSync(filePath);
    console.log("fsExist: ", fsExist);
    console.log("isExist: ", isExist);
    // const fileContent = await fspromises.readFile(filePath, { encoding: 'utf8' });

    // console.log("file content: ", fileContent);
    console.log("file read success");

    web.files.uploadV2({
      file: filePath, // fileContent,  // also accepts Buffer or ReadStream
      filename: 'test.json',
      channel_id: defaultFileUploadChannel || body.channel_id,
      initial_comment: 'This is a test uploaded file',
    }).then((response) => {
      res.status(200);
    }).catch(e => {
      console.log("error: ", e);
      res.status(500);
    });

    // uploadFile({
    //   fileName: 'test.json',
    //   filePath: filePath,
    //   channels: body.channel_id
    // }).then((res) => {
    //   res.status(200).json({status: true});
    // }).catch(e => {
    //   console.log("error: ", e);
    //   res.status(500)
    // })
  } catch (e) {
    res.status(500);
  }
}