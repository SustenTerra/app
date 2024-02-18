import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { useTheme } from 'styled-components/native';

import { useAuth } from '@/hooks/auth';
import { client } from '@/services/client';
import { showMessage } from '@/services/messages';

interface FavoriteButtonProps {
  size?: number;
  color?: 'dark' | 'light' | 'primary';
}

function FavoriteButton({ size = 24, color = 'dark' }: FavoriteButtonProps) {
  const { user } = useAuth();

  const favorite = () => {
    if (!user) {
      showMessage({
        type: 'danger',
        title: 'Atenção!',
        message: 'Você deve fazer login para favoritar um anúncio.',
      });
    } else {
      showMessage({
        type: 'success',
        title: 'Sucesso!',
        message: 'Anúncio adicionado aos favoritos.',
      });
    }
  };

  const theme = useTheme();
  return (
    <Feather
      name="heart"
      onPress={favorite}
      size={size}
      color={theme.colors[color]}
    />
  );
}

export default FavoriteButton;
