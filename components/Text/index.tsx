import { StyleProp, TextStyle } from 'react-native';

import { Container } from './styles';

interface TextProps {
  children: string;
  type?: 'body' | 'title' | 'subtitle' | 'caption' | 'button';
  size?: string;
  weight?: string;
  align?: string;
  style?: StyleProp<TextStyle>;
}

function Text({ children, style }: TextProps) {
  return <Container style={style}>{children}</Container>;
}

export default Text;
