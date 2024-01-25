import { useLocalSearchParams } from 'expo-router';
import styled from 'styled-components/native';

import Text from '@/components/Text';

export default function ShowContent() {
  const { contentId } = useLocalSearchParams();

  return (
    <Container>
      <Text>ShowContent</Text>
      <Text>{String(contentId)}</Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;
