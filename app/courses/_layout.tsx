import { Slot, useRouter } from 'expo-router';

import { FABChat } from '@/components/pages/courses';
import { useActionSheet } from '@/hooks/actionSheet';
import { useAuth } from '@/hooks/auth';

export default function CoursesLayout() {
  const auth = useAuth();
  const router = useRouter();

  const actionSheet = useActionSheet({
    title: 'Atenção!',
    message: 'Você precisa estar logado para acessar o chat.',
    actions: ['Realizar login', 'Criar conta'],
    actionsCallbacks: [
      () => router.navigate('/login'),
      () => router.navigate('/sign-up'),
    ],
  });

  return (
    <>
      <Slot />
      <FABChat
        onPress={() => {
          if (!auth.user) {
            actionSheet.show();
            return;
          }

          router.navigate('/chat');
        }}
      />
    </>
  );
}
