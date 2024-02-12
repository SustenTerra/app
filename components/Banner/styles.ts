import styled from 'styled-components/native';

import { moderateScale, verticalScale } from '@/utils/scale';

export const Wrapper = styled.TouchableOpacity`
  margin-top: ${verticalScale(20)}px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Background = styled.ImageBackground`
  width: 90%;
  height: ${verticalScale(100)}px;
  border-radius: ${moderateScale(25)}px;
`;

export const Content = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.55);
  align-items: flex-start;
  justify-content: center;
  border-radius: ${moderateScale(25)}px;
  padding: ${moderateScale(20)}px;
`;

export const ContentRow = styled.View`
  flex-direction: row;
  width: 100%;
  padding-right: ${moderateScale(20)}px;
  align-items: center;
  justify-content: space-between;
`;
