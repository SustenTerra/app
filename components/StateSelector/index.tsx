import Feather from '@expo/vector-icons/Feather';
import { useTheme } from 'styled-components/native';

import { Container, StateText } from './styles';

export default function StateSelector() {
  const theme = useTheme();

  return (
    <Container>
      <Feather name="map-pin" size={20} color={theme.colors.secondary} />

      <StateText color="secondary" weight="bold">
        SP
      </StateText>
    </Container>
  );
}
