import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { useTheme } from 'styled-components/native';

import { Container } from './styles';

import { useActionSheet } from '@/hooks/actionSheet';

interface MoreOptionsButtonProps {
  color?: 'primary' | 'light';
  postId?: number;
  userId?: number;
}

function MoreOptionsButton({
  color = 'light',
  postId,
  userId,
}: MoreOptionsButtonProps) {
  const router = useRouter();
  const theme = useTheme();

  const actionSheet = useActionSheet({
    title: 'Opções',
    message: 'Escolha uma opção',
    actions: ['Compatilhar anúncio', 'Ver portfólio do autor'],
    actionsCallbacks: [
      () =>
        postId &&
        Sharing.shareAsync(`https://sustenterra.netlify.app/posts/${postId}`),
      () => userId && router.push(`/posts?userId=${userId}`),
    ],
  });

  return (
    <Container onPress={actionSheet.show} marginRight={10} color={color}>
      <Feather
        name="more-vertical"
        size={24}
        color={color === 'primary' ? theme.colors.light : theme.colors.dark}
      />
    </Container>
  );
}

export default MoreOptionsButton;
