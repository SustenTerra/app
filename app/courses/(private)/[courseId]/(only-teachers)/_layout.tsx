import { Redirect, Slot } from 'expo-router';

import { useAuth } from '@/hooks/auth';
import { showMessage } from '@/services/messages';

export default function TeachersCoursesLayout() {
  const auth = useAuth();

  if (!auth.loading && !auth.user) {
    return <Redirect href="/login" />;
  }

  if (!auth.user?.teacher_at) {
    showMessage({
      type: 'danger',
      title: 'Acesso negado',
      message: 'Você não tem permissão para acessar essa página',
    });

    return <Redirect href="/courses" />;
  }

  return <Slot />;
}
