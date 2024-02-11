import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import styled, { ThemeProvider } from 'styled-components/native';

import { useCustomFont } from '@/hooks/customFont';
import theme from '@/styles/theme';
import { webOnlyCSS } from '@/utils/platform';
import { height } from '@/utils/scale';

export default function Layout() {
  const { fontsLoaded, fontError, onLayoutRootView } = useCustomFont();

  if (!fontsLoaded) {
    if (fontError) {
      console.error(fontError);
    }

    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <ActionSheetProvider>
        <Container
          onLayout={onLayoutRootView}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <StatusBar style="auto" />

          <ChildrenContainer>
            <Slot />
          </ChildrenContainer>
        </Container>
      </ActionSheetProvider>
    </ThemeProvider>
  );
}

const Container = styled.ScrollView`
  display: flex;
  width: 100%;
  height: ${height}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ChildrenContainer = styled.View`
  width: 100%;
  height: ${height}px;
  align-items: center;
  justify-content: center;

  ${webOnlyCSS`
    width: 100%;
    max-width: 500px;
    min-height: 100vh;
  `}
`;
