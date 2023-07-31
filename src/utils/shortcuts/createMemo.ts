import { MemoRecord } from "../../storage/types";
import { ShortcutCallbackResponse } from "../slack-shortcut-callback";
import { v4 as uuidV4 } from 'uuid';
import { createMemoRecord } from "../../storage";
import { ModalSubmitPayload } from "../slack-modal-submit";
import { createMemo } from "../../db/memo";

export const saveMemoHandler = (response: ShortcutCallbackResponse) => {
  const viewBlocks = {
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
            "text": "Give this memo a title to remember it by"
          }
        },
        "label": {
          "type": "plain_text",
          "text": "Title"
        }
      }
    ],
    "type": "modal",
    "callback_id": "create_memo_modal",
    "private_metadata": JSON.stringify({
      originalChatUrl: `https://cash.slack.com/archives/${response.channel.id}/p${response.message_ts.split('.').join('')}`
    }),
  };

  return {
    trigger_id: response.trigger_id,
    view: viewBlocks,
  };
}

export const createMemoHandler = async (response: ModalSubmitPayload) => {
  let url = '', title = '';
  try {
    const metaData = JSON.parse(response.view.private_metadata);
    url = metaData.originalChatUrl;
  } catch (e) {
  }

  const inputId = response.view.blocks.find((block) => block.type === 'input')?.block_id || '';
  if (inputId) {
    title = response.view.state.values[inputId].memo_title.value;
  }
  const userId = response.user.id;

  const newMemoRecord: MemoRecord = {
    memoId: uuidV4(),
    title,
    url,
    userId
  };

  // createMemoRecord(newMemoRecord);
  await createMemo(newMemoRecord);

  return newMemoRecord;
}