import { Container } from './styles';

interface SafeContainerProps {
  children: React.ReactNode;
}

function SafeContainer({ children }: SafeContainerProps) {
  return <Container>{children}</Container>;
}

export default SafeContainer;
