import { useTheme } from 'styled-components/native';

import { Container, FlatContainer, LoadingIndicator } from './styles';

import Text from '@/components/Text';
import { verticalScale } from '@/utils/scale';

interface LoadingProps {
  height?: number;
}

function Loading({ height }: LoadingProps) {
  const theme = useTheme();

  return (
    <Container height={height}>
      <LoadingIndicator size="large" color={theme.colors.primary} />
      <Text style={{ marginTop: verticalScale(10) }} color="primary">
        Carregando...
      </Text>
    </Container>
  );
}

interface HorizontalLoadingProps {
  color?: 'primary' | 'secondary' | 'light';
}

export function HorizontalLoading({ color }: HorizontalLoadingProps) {
  const theme = useTheme();

  return (
    <FlatContainer>
      <LoadingIndicator size="small" color={theme.colors[color || 'primary']} />
    </FlatContainer>
  );
}

export default Loading;
