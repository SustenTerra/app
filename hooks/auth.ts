import { useEffect, useState } from 'react';

import { UserView } from '@/api';
import { getUserAsync, onLogout } from '@/services/authStorage';

export function useAuth() {
  const [user, setUser] = useState<UserView | null>(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    const user = await getUserAsync();

    setUser(user);
    setLoading(false);
  };

  const logoutUser = async () => {
    setUser(null);
    await onLogout();
  };

  useEffect(() => {
    getUser();
  }, []);

  return {
    user,
    loading,
    logoutUser,
  };
}
