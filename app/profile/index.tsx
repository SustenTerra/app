import { useRouter } from 'expo-router';

import ScrollablePage from '@/components/ScrollablePage';
import {
  ProfileButton,
  ProfileButtonProps,
  ProfileInfo,
} from '@/components/pages/profile';
import { useActionSheet } from '@/hooks/actionSheet';
import { useAuth } from '@/hooks/auth';
import { showMessage } from '@/services/messages';

export default function Profile() {
  const auth = useAuth();
  const router = useRouter();

  const actionSheet = useActionSheet({
    title: 'Atenção!',
    message: 'Você tem certeza que deseja sair da sua conta?',
    actions: ['Sim, sair'],
    actionsCallbacks: [
      () => {
        showMessage({
          type: 'success',
          title: 'Até logo!',
          message: 'Você saiu da sua conta!',
        });

        auth.logoutUser();

        router.replace('/');
      },
    ],
  });

  const options: ProfileButtonProps[] = [
    {
      icon: 'grid',
      title: 'Meus anúncios',
      description: 'Gerencie os seus anúncios criados',
      href: '/profile/my-posts',
    },
    {
      icon: 'book',
      title: 'Meus cursos',
      description: 'Cursos em andamento e disponíveis',
      href: '/courses',
    },
    {
      icon: 'edit',
      title: 'Editar perfil',
      description: 'Atualize suas informações pessoais',
      href: '/profile/edit',
    },
    {
      icon: 'lock',
      title: 'Alterar senha',
      description: 'Mude a senha da sua conta',
      href: '/profile/edit-password',
    },
    {
      icon: 'log-out',
      title: 'Sair',
      description: 'Desconecte-se da sua conta',
      onPress: actionSheet.show,
    },
  ];

  return (
    <ScrollablePage>
      <ProfileInfo />

      {options.map((option) => (
        <ProfileButton key={option.title} {...option} />
      ))}
    </ScrollablePage>
  );
}
