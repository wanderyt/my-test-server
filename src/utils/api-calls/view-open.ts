import {ModalView, WebClient} from '@slack/web-api';

const token = process.env.SLACK_BOT_TOKEN;

const web = new WebClient(token);

export const openView = async ({
  triggerId,
  view
}: {
  triggerId: string,
  view: any
}) => {
  const res = await web.views.open({
    trigger_id: triggerId,
    view,
  });

  console.log('views open res: ', res);
}
