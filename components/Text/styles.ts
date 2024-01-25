import styled from 'styled-components/native';

import { moderateScale } from '@/utils/scale';

export type FontSizeOptions =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | number;
export type FontWeightOptions = 'bold' | 'regular' | 'light';
export type FontColorOptions =
  | 'primary'
  | 'secondary'
  | 'dark'
  | 'textBody'
  | 'light'
  | string;

const fontSizes = {
  h1: moderateScale(32),
  h2: moderateScale(30),
  h3: moderateScale(28),
  h4: moderateScale(26),
  h5: moderateScale(24),
  h6: moderateScale(18),
  p: moderateScale(16),
};

const fontWeights = {
  bold: 'InriaSans_700Bold',
  regular: 'InriaSans_400Regular',
  light: 'InriaSans_300Light',
};

interface ContainerProps {
  fontWeight: FontWeightOptions;
  size: FontSizeOptions;
  color: FontColorOptions;
}

export const Container = styled.Text<ContainerProps>`
  font-family: ${(props) => fontWeights[props.fontWeight]};
  font-size: ${(props) =>
    typeof props.size === 'number' ? props.size : fontSizes[props.size]}px;
  color: ${(props) => {
    const colorsMap = new Map(Object.entries(props.theme.colors));

    if (colorsMap.has(props.color)) {
      return colorsMap.get(props.color);
    }

    return props.color;
  }};
`;
