import { getTokenAsync } from './authStorage';

import { AppClient } from '@/api';

async function getToken() {
  const token = await getTokenAsync();
  return token ? token : '';
}

export const client = new AppClient({
  BASE: process.env.EXPO_PUBLIC_API_URL,
  TOKEN: getToken,
});
