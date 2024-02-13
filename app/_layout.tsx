import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Slot } from 'expo-router';
import FlashMessage from 'react-native-flash-message';
import styled, { ThemeProvider } from 'styled-components/native';

import { useCustomFont } from '@/hooks/customFont';
import theme from '@/styles/theme';
import { webOnlyCSS } from '@/utils/platform';

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
        <Container onLayout={onLayoutRootView}>
          <Slot />
        </Container>
      </ActionSheetProvider>

      <FlashMessage position="top" />
    </ThemeProvider>
  );
}

const Container = styled.View`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};

  align-self: center;

  ${webOnlyCSS`
    width: 100%;
    max-width: 500px;
    min-height: 100vh;
  `}
`;
