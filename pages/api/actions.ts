import type { NextApiRequest, NextApiResponse } from 'next'
import { SlackAction } from '../../src/utils/slack-action';
import { checkActionType, getCheckboxAction } from '../../src/utils/action-util';
import axios from 'axios'
import { ShortcutCallbackResponse } from '../../src/utils/slack-shortcut-callback';
import { createMemoHandler, saveMemoHandler } from '../../src/utils/shortcuts/createMemo';
import { openView } from '../../src/utils/api-calls/view-open';
import { postMessage } from '../../src/utils/api-calls/post-message';
import { ModalSubmitPayload } from '../../src/utils/slack-modal-submit';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('action response: ', req.body);
  let selectedAction = '';

  try {
    const reqBody = JSON.parse(req.body.payload);
    const actionType = checkActionType(reqBody);
    console.log('action type: ', actionType);
    if (actionType === 'block_actions') {
      const checkboxAction = getCheckboxAction('checkboxes-action', reqBody as SlackAction);
      if (checkboxAction) {
        selectedAction = checkboxAction.selected_options.map(o => o.value).join(', ');
        await axios.post(reqBody.response_url, {
          "text": "Oh hey, this is a nifty ephemeral message response from David, and you just selected " + selectedAction,
        })
        res.status(200).json({selected: selectedAction});
      }
    } else if (actionType === 'message_action') {
      const callbackId = (reqBody as ShortcutCallbackResponse).callback_id;
      if (callbackId === 'create_memo') {
        const blocks = saveMemoHandler(reqBody);
        // const view = JSON.stringify(blocks.view, null, 0);
        console.log("blocks: ", JSON.stringify(blocks.view, null, 0));
        console.log("env bot token: ", 'Bearer ' + process.env.SLACK_BOT_TOKEN + ';');
        await openView({
          triggerId: blocks.trigger_id,
          view: blocks.view
        });
        res.status(200).send('');
      }
    } else if (actionType === 'view_submission') {
      const callbackId = (reqBody as ModalSubmitPayload).view.callback_id;
      if (callbackId === 'create_memo_modal') {
        const memo = await createMemoHandler(reqBody);
        await postMessage({
          message: 'Saved this memo - ' + memo.url
        });
        res.status(200).send('');
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({error: e});
  }
}