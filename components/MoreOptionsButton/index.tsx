import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { useTheme } from 'styled-components/native';

import { Container } from './styles';

interface MoreOptionsButtonProps {
  color?: 'primary' | 'light';
}

function MoreOptionsButton({ color = 'light' }: MoreOptionsButtonProps) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Container onPress={() => {}} marginRight={10} color={color}>
      <Feather
        name="more-vertical"
        size={24}
        color={color === 'primary' ? theme.colors.light : theme.colors.dark}
      />
    </Container>
  );
}

export default MoreOptionsButton;
