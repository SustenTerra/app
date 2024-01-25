import styled from 'styled-components/native';

import { moderateScale } from '@/utils/scale';

export type FontTypeOptions = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
export type FontWeightOptions = 'bold' | 'regular' | 'light';
export type FontColorSchemeOptions =
  | 'primary'
  | 'secondary'
  | 'regular'
  | 'light';

const fontType = {
  h1: moderateScale(40),
  h2: moderateScale(30),
  h3: moderateScale(24),
  h4: moderateScale(20),
  h5: moderateScale(16),
  h6: moderateScale(14),
  p: moderateScale(12),
};

interface ContainerProps {
  size?: number;
  fontType: FontTypeOptions;
  fontWeight: FontWeightOptions;
  colorScheme: FontColorSchemeOptions;
  color?: string;
}

export const Container = styled.Text<ContainerProps>`
  font-family: 'InriaSans_400Regular';
  font-size: ${(props) => props.size || fontType[props.fontType]}px;
`;
