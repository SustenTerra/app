import { router } from 'expo-router';
import { useCallback } from 'react';
import styled from 'styled-components/native';

import Text from '@/components/Text';

export default function Unmatched() {
  const redirectToHome = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/');
  }, []);

  return (
    <Container onLayout={redirectToHome}>
      <Text>Essa página não existe...</Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;
