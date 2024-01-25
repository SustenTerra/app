import styled from 'styled-components/native';

import Text from '@/components/Text';
import { moderateScale } from '@/utils/scale';

export default function Home() {
  return (
    <Container>
      <Text weight="regular" size="h1" color="primary">
        Explore as possibilidades que a
        <Text weight="bold" size="h1" color="primary">
          {' '}
          Geotinta{' '}
        </Text>
        pode te oferecer
      </Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${moderateScale(20)}px;
`;
