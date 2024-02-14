import styled from 'styled-components/native';

import Text from '@/components/Text';
import { horizontalScale, moderateScale, verticalScale } from '@/utils/scale';

export const TopWrapper = styled.View`
  height: ${verticalScale(260)}px;
  width: 100%;
  position: relative;
  z-index: 0;
`;

interface TransparentProps {
  darker?: boolean;
}

export const TransparentBackground = styled.SafeAreaView<TransparentProps>`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, ${(props) => (props.darker ? '0.8' : '0.4')});
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
  flex-direction: row;
  align-items: center;
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
  padding: ${moderateScale(10)}px;
`;

interface CourseViewWrapperProps {
  fixedWidth?: boolean;
}

export const CourseViewWrapper = styled.TouchableOpacity<CourseViewWrapperProps>`
  width: ${({ fixedWidth }) =>
    fixedWidth ? `${horizontalScale(300)}px` : '100%'};
  align-items: center;
  justify-content: center;
`;

export const CourseViewBackground = styled.ImageBackground`
  width: 95%;
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

export const CourseChapterContainer = styled.TouchableOpacity`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${moderateScale(100)}px;
  align-items: center;
  height: ${verticalScale(50)}px;
  padding-left: ${horizontalScale(20)}px;
  margin-top: ${verticalScale(25)}px;

  flex-direction: row;
`;

export const CourseChapterTitle = styled(Text)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.secondary};
  margin-left: ${horizontalScale(10)}px;
`;

export const CourseContentWrapper = styled.TouchableOpacity`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${moderateScale(100)}px;
  align-items: center;
  justify-content: space-between;
  height: ${verticalScale(50)}px;
  padding: 0 ${horizontalScale(20)}px;
  margin-top: ${verticalScale(10)}px;

  flex-direction: row;
`;

export const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CourseContentTitle = styled(Text)`
  margin-left: ${horizontalScale(10)}px;
`;

export const ScrollerWrapper = styled.View`
  width: 100%;
  margin-bottom: ${verticalScale(10)}px;
`;

export const HorizontalScroller = styled.ScrollView``;

export const CourseSummaryWrapper = styled.View`
  margin: ${verticalScale(10)}px 0;
`;
