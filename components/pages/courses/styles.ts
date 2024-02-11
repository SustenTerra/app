import styled from 'styled-components/native';

import { moderateScale, verticalScale } from '@/utils/scale';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const TransparentBackground = styled.SafeAreaView`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ContentBackground = styled.View`
  height: 100%;
  width: 100%;
  padding: ${moderateScale(20)}px;
`;

export const HeaderBackground = styled.ImageBackground`
  width: 100%;
  height: ${verticalScale(230)}px;
`;

export const DescriptionWrapper = styled.View`
  margin-top: ${verticalScale(10)}px;
`;

export const HeaderWrapper = styled.View`
  align-items: center;
  flex-direction: row;
`;
