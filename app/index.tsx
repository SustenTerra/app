import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';

export default function Home() {
  return (
    <Container>
      <StatusBar style="auto" />
      <Text>This is the HomePage</Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: red;
  align-items: center;
  justify-content: center;
`;
