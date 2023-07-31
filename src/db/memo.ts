import axios, { AxiosResponse } from 'axios';
import { MemoRecord } from '../storage/types';

const cookieName = process.env.COOKIE_NAME;
const cookieValue = process.env.COOKIE_VALUE;

export const createMemo = (data: MemoRecord) => {
  return axios.post('http://fin.doublerb.cn/api/slack/createMemo', {data}, {
    headers: {
      Cookie: `${cookieName}=${cookieValue}`
    }
  });
}

export const getMemo = (userId: string): Promise<AxiosResponse<{
  data: {
    rows: MemoRecord[]
  }
}>> => {
  return axios.get(`http://fin.doublerb.cn/api/slack/getMemos?userId=${userId}`, {
    headers: {
      Cookie: `${cookieName}=${cookieValue}`
    }
  });
}
