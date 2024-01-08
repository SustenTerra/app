import { Link } from 'expo-router';
import { Text } from 'react-native';
import styled from 'styled-components/native';

export default function SignUp() {
  return (
    <Container>
      <Text>This is the SignUpPage</Text>
      <Link href="/">
        <Text>Home</Text>
      </Link>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;
