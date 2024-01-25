import styled from 'styled-components/native';

import Text from '@/components/Text';

export default function Login() {
  return (
    <Container>
      <Text>Login</Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;
