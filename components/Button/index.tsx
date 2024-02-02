import { ReactNode } from 'react';
import { StyleProp, TextStyle } from 'react-native';

import {
  StyledButton,
  ColorOptions
} from './styles';

interface ButtonProps {
  children?: ReactNode;
  color?: ColorOptions;
  style?: StyleProp<TextStyle>;
}

function Button({
  children,
  color = 'dark',
  ...props
}: ButtonProps) {
  return (
    <StyledButton color={color} {...props}>
      {children}
    </StyledButton>
  );
}

export default Button;
