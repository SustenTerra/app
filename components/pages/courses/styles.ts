import styled from 'styled-components/native';

import { horizontalScale, moderateScale, verticalScale } from '@/utils/scale';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const TopWrapper = styled.View`
  height: ${verticalScale(260)}px;
  width: 100%;
  position: relative;
  z-index: 0;
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
  padding-top: ${verticalScale(20)}px;
`;

export const SearchWrapper = styled.View`
  width: 80%;

  position: absolute;
  bottom: ${verticalScale(5)}px;
  left: 10%;
  z-index: 1;
`;

export const Content = styled.View`
  flex: 1;
  padding-bottom: ${verticalScale(20)}px;
`;

export const TitleContainer = styled.View`
  padding: ${verticalScale(20)}px ${horizontalScale(20)}px
    ${verticalScale(10)}px ${horizontalScale(20)}px;
`;

export const CourseViewWrapper = styled.TouchableOpacity`
  margin-top: ${verticalScale(20)}px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const CourseViewBackground = styled.ImageBackground`
  width: 90%;
  height: ${verticalScale(150)}px;
  border-radius: ${moderateScale(25)}px;
`;

export const ContentContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  align-items: flex-start;
  justify-content: center;
  border-radius: ${moderateScale(25)}px;
  padding: ${moderateScale(20)}px;
`;

export const AuthorWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${verticalScale(5)}px;
`;
