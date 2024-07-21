import styled from 'styled-components/native';

import Text from '../Text';

import { horizontalScale, moderateScale, verticalScale } from '@/utils/scale';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(5)}px;
  padding: ${verticalScale(10)}px ${horizontalScale(15)}px;
  background-color: ${(props) => props.theme.colors.light};
  border-radius: 100px;
`;

export const StateText = styled(Text)``;

export const StatesList = styled.ScrollView`
  padding: ${verticalScale(10)}px 0;
  top: 100px;
  z-index: 1;
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
