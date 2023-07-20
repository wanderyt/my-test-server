import {ModalView, WebClient} from '@slack/web-api';

const token = process.env.SLACK_BOT_TOKEN;

const web = new WebClient(token);

export const postMessage = async ({
  message
}: {
  message: string,
}) => {
  const res = await web.chat.postMessage({ channel: 'D04U9E41CHE', text: message || 'Hello there' });

  console.log('views open res: ', res);
}
