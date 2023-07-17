import type { NextApiRequest, NextApiResponse } from 'next'
import { SlackAction } from '../../src/utils/slack-action';
import { checkActionType, getCheckboxAction } from '../../src/utils/action-util';
import axios from 'axios'
import { ShortcutCallbackResponse } from '@/src/utils/slack-shortcut-callback';
import { createMemoHandler } from '@/src/utils/shortcuts/createMemo';

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
        axios.post(reqBody.response_url, {
          "text": "Oh hey, this is a nifty ephemeral message response from David, and you just selected " + selectedAction,
        }).finally(() => {
          res.status(200).json({selected: selectedAction});
        });
      }
    } else if (actionType === 'message_action') {
      const callbackId = (reqBody as ShortcutCallbackResponse).callback_id;
      if (callbackId === 'create_memo') {
        createMemoHandler(reqBody);
        res.status(200).send('message saved!');
      }
    }
  } catch (e) {
    res.status(500).json({error: e});
  }
}