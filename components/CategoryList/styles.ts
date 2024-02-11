import styled from 'styled-components/native';

import { horizontalScale, moderateScale, verticalScale } from '@/utils/scale';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  gap: ${horizontalScale(10)}px;
  overflow-x: scroll;
  padding: ${verticalScale(10)}px ${horizontalScale(20)}px;
`;

interface ButtonProps {
  active: boolean;
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  height: ${verticalScale(40)}px;
  padding: ${moderateScale(10)}px ${moderateScale(20)}px;
  border-radius: ${moderateScale(40)}px;

  background-color: ${(props) =>
    props.active ? props.theme.colors.primary : props.theme.colors.light};
`;
