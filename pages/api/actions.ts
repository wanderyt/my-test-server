import type { NextApiRequest, NextApiResponse } from 'next'
import { SlackAction } from '../../src/utils/slack-action';
import { getCheckboxAction } from '../../src/utils/action-util';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('actions: ',req.body);

  const reqBody = req.body as SlackAction;

  const checkboxAction = getCheckboxAction('checkboxes-action', reqBody);

  let selectedAction = '';
  if (checkboxAction) {
    selectedAction = checkboxAction.selected_options.map(o => o.value).join(', ');
  }

  res.status(200).json({selected: selectedAction});
}