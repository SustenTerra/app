import { router } from 'expo-router';
import { jwtDecode } from 'jwt-decode';

import { getTokenAsync } from './authStorage';

import { AppClient } from '@/api';

declare const process: {
  env: {
    EXPO_PUBLIC_API_URL?: string;
  };
};

// coloque um nome melhor para a função
function logoutUser() {
  // const auth = useAuth();
  // auth.logoutUser();
  router.replace('/login');
}

async function getToken() {
  const token = await getTokenAsync();

  if (token) {
    const decodedToken = jwtDecode(token);
    const expirationDate = decodedToken?.exp ? decodedToken.exp * 1000 : null;
    if (expirationDate && Date.now() >= expirationDate) {
      logoutUser();
    }
  }

  return token ? token : '';
}

const base_url =
  process.env.EXPO_PUBLIC_API_URL ||
  'https://backend-staging-production-d239.up.railway.app';

export const client = new AppClient({
  BASE: base_url,
  TOKEN: getToken,
});
