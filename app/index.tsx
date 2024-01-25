import { Link } from 'expo-router';
import { Text } from 'react-native';
import styled from 'styled-components/native';

export default function Home() {
  return (
    <Container>
      <Title>This is the HomePage</Title>
      <Link href="/login">
        <Text>Login</Text>
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

const Title = styled.Text`
  font-family: 'InriaSans_400Regular';
  font-size: 24px;
  text-align: center;
`;
