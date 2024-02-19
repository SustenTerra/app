import Feather from '@expo/vector-icons/Feather';
import { Link, useRouter } from 'expo-router';
import styled, { useTheme } from 'styled-components/native';

import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import {
  ProfileButton,
  ProfileButtonProps,
  ProfileInfo,
} from '@/components/pages/profile';
import { ProfileSpacer } from '@/components/pages/profile/styles';
import { useActionSheet } from '@/hooks/actionSheet';
import { useAuth } from '@/hooks/auth';
import { showMessage } from '@/services/messages';
import { horizontalScale, moderateScale } from '@/utils/scale';

export default function Profile() {
  const auth = useAuth();
  const router = useRouter();
  const theme = useTheme();

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

      <NewPostWrapper>
        <Link push href="/posts/new-post" asChild>
          <NewPostContainer>
            <Feather name="plus" size={24} color={theme.colors.light} />

            <Text
              color="light"
              size="h6"
              weight="bold"
              style={{ marginLeft: horizontalScale(16) }}
            >
              Criar novo anúncio
            </Text>
          </NewPostContainer>
        </Link>
      </NewPostWrapper>

      {options.map((option) => (
        <ProfileButton key={option.title} {...option} />
      ))}

      <ProfileSpacer />
    </ScrollablePage>
  );
}

const NewPostWrapper = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const NewPostContainer = styled.TouchableOpacity`
  width: 70%;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(60)}px;
  margin-bottom: ${moderateScale(16)}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
