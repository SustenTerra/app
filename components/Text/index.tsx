import { ReactNode } from 'react';
import { StyleProp, TextStyle } from 'react-native';

import {
  Container,
  FontColorOptions,
  FontSizeOptions,
  FontWeightOptions,
} from './styles';

interface TextProps {
  children?: ReactNode;
  weight?: FontWeightOptions;
  size?: FontSizeOptions;
  color?: FontColorOptions;
  style?: StyleProp<TextStyle>;
}

function Text({
  children,
  size = 'p',
  weight = 'regular',
  color = 'dark',
  ...props
}: TextProps) {
  return (
    <Container size={size} fontWeight={weight} color={color} {...props}>
      {children}
    </Container>
  );
}

export default Text;
