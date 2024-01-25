import { StatusBar } from 'expo-status-bar';
import { Slot } from 'expo-router';
import { useCustomFont } from '@/hooks/custom-font';
import styled from 'styled-components/native';

export default function Layout() {
  const { fontsLoaded, fontError, onLayoutRootView } = useCustomFont();

  if (!fontsLoaded) {
    if (fontError) {
      console.error(fontError);
    }

    return null;
  }

  return (
    <Container onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      <Slot />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;
