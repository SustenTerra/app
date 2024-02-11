import styled from 'styled-components/native';

import { horizontalScale, moderateScale } from '@/utils/scale';

interface ContainerProps {
  marginRight: number;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  margin-right: ${(props) => horizontalScale(props.marginRight)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
`;
