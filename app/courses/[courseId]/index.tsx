import { useLocalSearchParams } from 'expo-router';
import styled from 'styled-components/native';

import Text from '@/components/Text';

export default function ShowCourse() {
  const { courseId } = useLocalSearchParams();

  return (
    <Container>
      <Text>ShowCourse</Text>
      <Text>{String(courseId)}</Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;
