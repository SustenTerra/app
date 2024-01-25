import { StyleProp, TextStyle } from 'react-native';

import {
  Container,
  FontColorSchemeOptions,
  FontTypeOptions,
  FontWeightOptions,
} from './styles';

interface TextProps {
  children?: string | string[];
  type?: FontTypeOptions;
  weight?: FontWeightOptions;
  colorScheme?: FontColorSchemeOptions;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

function Text({
  children,
  type = 'p',
  weight = 'regular',
  colorScheme = 'regular',
  ...props
}: TextProps) {
  return (
    <Container
      fontType={type}
      fontWeight={weight}
      colorScheme={colorScheme}
      {...props}
    >
      {children}
    </Container>
  );
}

export default Text;
