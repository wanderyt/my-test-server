import { SlackAction } from "./slack-action";

export const getCheckboxAction = (id: string, actionResponse: SlackAction) => {
  const action = actionResponse.actions.find(a => a.action_id === id);
  return action;
}