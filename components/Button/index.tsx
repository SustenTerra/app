import { ReactNode } from 'react';
import { StyleProp, TextStyle, TouchableOpacityProps } from 'react-native';

import { StyledButton, ColorOptions } from './styles';

interface CustomButtonProps extends TouchableOpacityProps {
  outline?: boolean;
  children?: ReactNode;
  color?: ColorOptions;
  style?: StyleProp<TextStyle>;
}

function Button({ children, color = 'dark', ...props }: CustomButtonProps) {
  return (
    <StyledButton color={color} {...props}>
      {children}
    </StyledButton>
  );
}

export default Button;
