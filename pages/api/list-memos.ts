import { getMemoRecords } from '../../src/storage';
import type { NextApiRequest, NextApiResponse } from 'next'
import { MemoRecord, MemoRecordDB } from '../../src/storage/types';
import { SlackMessageRequest } from '../../src/utils/slack-message';
import { getMemo } from '../../src/db/memo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // const memoRecords = getMemoRecords();
    const userId = (req.body as SlackMessageRequest).user_id;
    const memoRecords = await getMemo(userId);
    const memoTemplate = (memo: MemoRecordDB) => {
      return {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `*<${memo.URL}|${memo.TITLE}>* - ${memo.URL}`
        }
      }
    };

    const memoData = memoRecords.data.data.rows;
    console.log("memoData: ", memoData);
    const memoBlocks = memoData.map(memoTemplate);
    console.log("memoBlocks: ", memoBlocks);

    const blocks = {
      // blocks: memoRecords.filter((record) => record.userId === (req.body as SlackMessageRequest).user_id).map(memoTemplate)
      blocks: memoBlocks
    };
    res.status(200).json(blocks);
  } catch (e) {
    res.status(200);
  }
}