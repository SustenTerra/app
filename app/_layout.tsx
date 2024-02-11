import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
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
          <StatusBar style="auto" />

          <ChildrenContainer>
            <Slot />
          </ChildrenContainer>
        </Container>
      </ActionSheetProvider>
    </ThemeProvider>
  );
}

const Container = styled.View`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
  justify-content: center;
`;

const ChildrenContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  ${webOnlyCSS`
    width: 100%;
    max-width: 500px;
  `}
`;
