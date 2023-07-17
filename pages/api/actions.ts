import type { NextApiRequest, NextApiResponse } from 'next'
import { SlackAction } from '../../src/utils/slack-action';
import { getCheckboxAction } from '../../src/utils/action-util';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('actions: ', req.body);
  let selectedAction = '';

  try {
    const reqBody = JSON.parse(req.body) as SlackAction;

    const checkboxAction = getCheckboxAction('checkboxes-action', reqBody);


    if (checkboxAction) {
      selectedAction = checkboxAction.selected_options.map(o => o.value).join(', ');
    }


  } catch (e) {
    console.log('error: ', e);
  } finally {
    res.status(200).json({selected: selectedAction});
  }
}