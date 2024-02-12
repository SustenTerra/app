import { useTheme } from 'styled-components/native';

import { Container, LoadingIndicator } from './styles';

import Text from '@/components/Text';
import { verticalScale } from '@/utils/scale';

function Loading() {
  const theme = useTheme();

  return (
    <Container>
      <LoadingIndicator size="large" color={theme.colors.primary} />
      <Text style={{ marginTop: verticalScale(10) }} color="primary">
        Carregando...
      </Text>
    </Container>
  );
}

export default Loading;
