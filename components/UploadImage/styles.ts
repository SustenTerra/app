import styled from 'styled-components/native';

import { moderateScale, verticalScale } from '@/utils/scale';

export const Container = styled.View`
  width: 100%;
`;

export const ImageButton = styled.TouchableOpacity`
  width: 100%;
  height: ${verticalScale(250)}px;
  border-radius: ${moderateScale(25)}px;
`;

export const ImageForeGround = styled.View`
  position: absolute;
  height: 50%;
  bottom: 0;
  background-color: ${(props) => props.theme.colors.secondary};
  opacity: 0.7;
  justify-content: center;
  align-items: center;
  border-radius: ${moderateScale(25)}px;
  width: 100%;
`;

export const SelectedImage = styled.Image`
  width: 100%;
  height: ${verticalScale(250)}px;
  border-radius: ${moderateScale(25)}px;
`;
