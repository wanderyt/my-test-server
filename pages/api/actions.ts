import type { NextApiRequest, NextApiResponse } from 'next'
import { SlackAction } from '../../src/utils/slack-action';
import { getCheckboxAction } from '../../src/utils/action-util';
import axios from 'axios'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('action response: ', req.body);
  let selectedAction = '';

  try {
    const reqBody = JSON.parse(req.body.payload) as SlackAction;
    const checkboxAction = getCheckboxAction('checkboxes-action', reqBody);
    if (checkboxAction) {
      selectedAction = checkboxAction.selected_options.map(o => o.value).join(', ');
    }

  } catch (e) {
    console.log('error: ', e);
  } finally {
    console.log('returning response: ', selectedAction);
    const reqBody = JSON.parse(req.body.payload) as SlackAction;
    axios.post(reqBody.response_url, {
      "text": "Oh hey, this is a nifty ephemeral message response from David, and you just selected " + selectedAction,
    }).finally(() => {
      res.status(200).json({selected: selectedAction});
    });
  }
}