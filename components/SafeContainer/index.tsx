import { StyleProp, ViewStyle } from 'react-native';

import { Container } from './styles';

interface SafeContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

function SafeContainer({ children, style }: SafeContainerProps) {
  return <Container style={style}>{children}</Container>;
}

export default SafeContainer;
