import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';

import { isWeb } from '@/utils/platform';

interface Props {
  children: React.ReactNode;
}

function ScrollablePage({ children }: Props) {
  return (
    <Container
      automaticallyAdjustKeyboardInsets
      alwaysBounceVertical={false}
      contentContainerStyle={{
        width: '100%',
        minHeight: '100%',
      }}
    >
      {children}
    </Container>
  );
}

export default ScrollablePage;

const Container = styled(isWeb ? View : ScrollView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;
