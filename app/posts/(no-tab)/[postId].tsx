import { useLocalSearchParams } from 'expo-router';
import styled from 'styled-components/native';

import Text from '@/components/Text';

export default function ShowPost() {
  const { postId } = useLocalSearchParams();

  return (
    <Container>
      <Text>ShowPost</Text>
      <Text>{String(postId)}</Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;
