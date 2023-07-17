import { MemoRecord } from "../../storage/types";
import { ShortcutCallbackResponse } from "../slack-shortcut-callback";
import { v4 as uuidV4 } from 'uuid';
import { createMemoRecord } from "../../storage";

export const createMemoHandler = (response: ShortcutCallbackResponse) => {
  const newMemoRecord: MemoRecord = {
    memoId: uuidV4(),
    url: `https://cash.slack.com/archives/${response.channel.id}/p${response.message.thread_ts.split('.').join('')}`
  };

  createMemoRecord(newMemoRecord);
}