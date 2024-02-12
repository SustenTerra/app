import styled from 'styled-components/native';

import { horizontalScale, moderateScale, verticalScale } from '@/utils/scale';

export const Wrapper = styled.View`
  width: 100%;
  height: ${verticalScale(60)}px;
`;

export const Container = styled.ScrollView`
  padding: ${verticalScale(10)}px 0;
`;

interface ButtonProps {
  active: boolean;
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  height: ${verticalScale(40)}px;
  padding: ${moderateScale(10)}px ${moderateScale(20)}px;
  border-radius: ${moderateScale(40)}px;
  margin-right: ${horizontalScale(10)}px;

  background-color: ${(props) =>
    props.active ? props.theme.colors.primary : props.theme.colors.light};
`;
