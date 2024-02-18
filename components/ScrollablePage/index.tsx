import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  children: React.ReactNode;
}

function ScrollablePage({ children }: Props) {
  return (
    <Container
      automaticallyAdjustKeyboardInsets
      bounces={false}
      contentContainerStyle={{
        width: '100%',
        minHeight: '100%',
      }}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </Container>
  );
}

export default ScrollablePage;

const Container = styled(ScrollView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;
