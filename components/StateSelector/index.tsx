import Feather from '@expo/vector-icons/Feather';
import { Link, useLocalSearchParams } from 'expo-router';
import { useTheme } from 'styled-components/native';

import { Container, StateText } from './styles';

export default function StateSelector() {
  const theme = useTheme();

  const { selectedState } = useLocalSearchParams<{
    selectedState: string;
  }>();

  const label = selectedState || 'Todos';

  return (
    <Link href="/posts/select-state">
      <Container>
        <Feather name="map-pin" size={20} color={theme.colors.secondary} />

        <StateText color="secondary" weight="bold">
          {label}
        </StateText>
      </Container>
    </Link>
  );
}
