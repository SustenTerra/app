import { StatusBar } from 'expo-status-bar';
import { Slot } from 'expo-router';
import { useCustomFont } from '../hooks/custom-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import styled from 'styled-components/native';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const { fontsLoaded, fontError } = useCustomFont();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

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
