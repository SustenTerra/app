import { getTokenAsync } from './authStorage';
import { CustomAxiosClient } from './customAxios';

import { AppClient } from '@/api';

declare const process: {
  env: {
    EXPO_PUBLIC_API_URL?: string;
  };
};

const baseURL =
  process.env.EXPO_PUBLIC_API_URL ||
  'https://backend-staging-production-d239.up.railway.app';

async function getToken() {
  const token = await getTokenAsync();
  return token ? token : '';
}

export const client = new AppClient(
  {
    BASE: baseURL,
    TOKEN: getToken,
  },
  CustomAxiosClient,
);
