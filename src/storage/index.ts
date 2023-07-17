import { MemoRecord } from "./types";

global.memoRecords = (global.memoRecords || []) as MemoRecord[];

export const createMemoRecord = (newRecord: MemoRecord) => {
  if (global.memoRecords.find(r => r.memoId === newRecord.memoId)) {
    return;
  }

  global.memoRecords.push(newRecord);
  return newRecord;
}

export const getMemoRecords = (): MemoRecord[] => {
  return global.memoRecords;
}