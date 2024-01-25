import { StyleProp, TextStyle } from 'react-native';

import { Container } from './styles';

interface TextProps {
  children: string;
  style?: StyleProp<TextStyle>;
}

function Text({ children, style }: TextProps) {
  return <Container style={style}>{children}</Container>;
}

export default Text;
