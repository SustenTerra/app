import styled from 'styled-components/native';

import { horizontalScale, moderateScale } from '@/utils/scale';

interface ContainerProps {
  marginRight: number;
  color: 'primary' | 'light';
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  margin-right: ${(props) => horizontalScale(props.marginRight)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${(props) => props.theme.colors[props.color]};
  align-items: center;
  justify-content: center;
`;
