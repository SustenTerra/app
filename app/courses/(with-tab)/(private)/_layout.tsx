import { Redirect, Slot } from 'expo-router';

import { useAuth } from '@/hooks/auth';

export default function PrivateCoursesLayout() {
  const auth = useAuth();

  if (!auth.loading && !auth.user) {
    return <Redirect href="/login" />;
  }

  return <Slot />;
}
