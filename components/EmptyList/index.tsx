import Feather from '@expo/vector-icons/Feather';
import { useTheme } from 'styled-components/native';

import { Container } from './styles';

import Text from '@/components/Text';
import { verticalScale } from '@/utils/scale';

function EmptyList() {
  const theme = useTheme();

  return (
    <Container>
      <Feather
        name="frown"
        size={verticalScale(40)}
        color={theme.colors.primary}
      />

      <Text style={{ marginTop: verticalScale(10) }} color="primary">
        Infelizmente, não encontramos nada por aqui.
      </Text>
    </Container>
  );
}

export default EmptyList;
