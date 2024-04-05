import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { useTheme } from 'styled-components/native';

import { Container } from './styles';

interface BackButtonProps {
  defaultRoute?: string;
  href?: string;
  marginRight?: number;
  color?: 'primary' | 'light';
}

function BackButton({
  defaultRoute,
  marginRight,
  href,
  color = 'primary',
}: BackButtonProps) {
  const router = useRouter();
  const theme = useTheme();

  const handleBack = () => {
    if (href) {
      router.navigate(href);
      return;
    }

    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(defaultRoute || '/');
  };

  return (
    <Container
      onPress={handleBack}
      marginRight={marginRight || 10}
      color={color}
    >
      <Feather
        name="arrow-left"
        size={24}
        color={color === 'primary' ? theme.colors.light : theme.colors.dark}
      />
    </Container>
  );
}

export default BackButton;
