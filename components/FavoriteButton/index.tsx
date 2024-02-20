import Feather from '@expo/vector-icons/Feather';
import { useTheme } from 'styled-components/native';

import { useAuth } from '@/hooks/auth';
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
        type: 'warning',
        title: 'Atenção!',
        message: 'Funcionalidade ainda não implementada.',
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
