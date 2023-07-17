import type { NextApiRequest, NextApiResponse } from 'next'
import { SlackAction } from '../../src/utils/slack-action';
import { checkActionType, getCheckboxAction } from '../../src/utils/action-util';
import axios from 'axios'
import { ShortcutCallbackResponse } from '../../src/utils/slack-shortcut-callback';
import { createMemoHandler, saveMemoHandler } from '../../src/utils/shortcuts/createMemo';
import { headers } from 'next/dist/client/components/headers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('action response: ', req.body);
  let selectedAction = '';

  try {
    const reqBody = JSON.parse(req.body.payload);
    const actionType = checkActionType(reqBody);
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
        // createMemoHandler(reqBody);
        const blocks = saveMemoHandler(reqBody);
        await axios.post('https://slack.com/api/views.open', blocks, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer xoxb-1583951561970-4934854640485-U8ITBVK9cBtryETdX9e7nrOx'
          }
        })
        res.status(200).send('');
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({error: e});
  }
}