import { getTokenAsync } from './authStorage';

import { AppClient } from '@/api';

declare const process: {
  env: {
    EXPO_PUBLIC_API_URL?: string;
  };
};

async function getToken() {
  const token = await getTokenAsync();
  return token ? token : '';
}

const base_url =
  process.env.EXPO_PUBLIC_API_URL || 'https://sustentinta.up.railway.app';

export const client = new AppClient({
  BASE: base_url,
  TOKEN: getToken,
});
