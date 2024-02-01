import { UserView } from '@/api';
import { getStorageItemAsync, setStorageItemAsync } from '@/services/storage';

export function onLogin(token: string, user: UserView) {
  const promise1 = setStorageItemAsync('token', token);
  const promise2 = setStorageItemAsync('user', JSON.stringify(user));

  return Promise.all([promise1, promise2]);
}

export function onLogout() {
  const promise1 = setStorageItemAsync('token', null);
  const promise2 = setStorageItemAsync('user', null);

  return Promise.all([promise1, promise2]);
}

export function onUserUpdate(user: UserView) {
  return setStorageItemAsync('user', JSON.stringify(user));
}

export async function getTokenAsync() {
  return await getStorageItemAsync('token');
}

export async function getUserAsync(): Promise<UserView | null> {
  const user = await getStorageItemAsync('user');
  return user ? JSON.parse(user) : null;
}
