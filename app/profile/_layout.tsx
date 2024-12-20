import { Redirect, Slot } from 'expo-router';

import NavigationBar from '@/components/NavigationBar';
import { useAuth } from '@/hooks/auth';

export default function ProfileLayout() {
  const auth = useAuth();

  if (!auth.loading && !auth.user) {
    return <Redirect href="/login" />;
  }

  return (
    <>
      <Slot />
      <NavigationBar />
    </>
  );
}
