import { MemoRecord } from "../../storage/types";
import { ShortcutCallbackResponse } from "../slack-shortcut-callback";
import { v4 as uuidV4 } from 'uuid';
import { createMemoRecord } from "../../storage";

export const saveMemoHandler = (response: ShortcutCallbackResponse) => {
  const blocks = {
    "title": {
      "type": "plain_text",
      "text": "Save your memo"
    },
    "submit": {
      "type": "plain_text",
      "text": "Submit"
    },
    "blocks": [
      {
        "type": "input",
        "element": {
          "type": "plain_text_input",
          "action_id": "memo_title",
          "placeholder": {
            "type": "plain_text",
            "text": "Give this memo a title to remember by"
          }
        },
        "label": {
          "type": "plain_text",
          "text": "Title"
        }
      }
    ],
    "type": "modal",
    "callback_id": "create_memo_modal"
  };

  return blocks;
}

export const createMemoHandler = (response: ShortcutCallbackResponse) => {
  const newMemoRecord: MemoRecord = {
    memoId: uuidV4(),
    title: '',
    url: `https://cash.slack.com/archives/${response.channel.id}/p${response.message.thread_ts.split('.').join('')}`
  };

  createMemoRecord(newMemoRecord);
}