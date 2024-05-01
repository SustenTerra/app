import Feather from '@expo/vector-icons/Feather';
import { Link, useRouter } from 'expo-router';
import { Linking } from 'react-native';
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

  const isTeacher = auth.user?.teacher_at !== null;

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

  const actionSheetInstruct = useActionSheet({
    title: 'Atenção!',
    message:
      'Você tem certeza que deseja continuar? Você será redirecionado para um formulário externo',
    actions: ['Sim, sair'],
    actionsCallbacks: [
      () => {
        Linking.openURL('https://forms.gle/aSso8QEaHaqCu21G8');
      },
    ],
  });

  const options: ProfileButtonProps[] = [
    {
      icon: 'shopping-cart',
      title: 'Meus pedidos',
      description: 'Veja os pedidos que já realizou',
      href: '/profile/my-orders',
    },
    {
      icon: 'grid',
      title: 'Meus anúncios',
      description: 'Gerencie os seus anúncios criados',
      href: '/profile/my-posts',
    },
    {
      icon: 'book',
      title: isTeacher ? 'Meus cursos' : 'Assistir cursos',
      description: isTeacher
        ? 'Gerencie seu conteúdo'
        : 'Cursos em andamento e disponíveis',
      href: isTeacher ? '/courses/my-courses' : '/courses',
    },
    {
      icon: 'video',
      title: 'Torne-se instrutor(a)',
      description: 'Compartilhe seu conhecimento',
      onPress: actionSheetInstruct.show,
      shouldHide: isTeacher,
    },
    {
      icon: 'edit',
      title: 'Editar perfil',
      description: 'Atualize suas informações pessoais',
      href: '/profile/edit',
    },
    {
      icon: 'map-pin',
      title: 'Atualizar endereço',
      description: 'Informe seu endereço de entrega',
      href: '/profile/edit-address',
    },
    {
      icon: 'lock',
      title: 'Alterar senha',
      description: 'Mude a senha da sua conta',
      href: '/profile/edit-password',
    },
    {
      icon: 'help-circle',
      title: 'Precisa de ajuda?',
      description: 'Fale com os desenvolvedores',
      onPress: () => Linking.openURL('https://forms.gle/HeaFGVSq6HjP8wmz5'),
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
      <ProfileInfo useLoggedUser />

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
