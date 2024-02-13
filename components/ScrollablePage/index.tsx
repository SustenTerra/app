import styled from 'styled-components/native';

interface Props {
  children: React.ReactNode;
}

function ScrollablePage({ children }: Props) {
  return (
    <Container
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

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;
