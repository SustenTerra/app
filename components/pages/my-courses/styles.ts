import styled from 'styled-components/native';

import { moderateScale, verticalScale } from '@/utils/scale';

export const TopWrapper = styled.View`
  height: ${verticalScale(100)}px;
  width: 100%;
  position: relative;
  align-items: center;
  z-index: 0;
`;

export const HeaderBackground = styled.ImageBackground`
  width: 100%;
  height: ${verticalScale(120)}px;
`;

export const HeaderWrapper = styled.View`
  align-items: center;
  flex-direction: row;
  padding-top: ${verticalScale(20)}px;
`;

export const TransparentBackground = styled.SafeAreaView<TransparentProps>`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, ${(props) => (props.darker ? '0.8' : '0.4')});
`;

export const DescriptionWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${verticalScale(10)}px;
`;

export const ContentBackground = styled.View`
  height: 100%;
  width: 100%;
  padding: ${moderateScale(20)}px;
`;

export const MyCourseViewWrapper = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const MyCourseViewBackground = styled.ImageBackground`
  width: 95%;
  height: ${verticalScale(200)}px;
  border-radius: ${moderateScale(25)}px;
  align-items: column;
`;

export const MyCourseSummaryWrapper = styled.View`
  margin: ${verticalScale(10)}px 0;
`;

interface TransparentProps {
  darker?: boolean;
}

export const Content = styled.View`
  margin-top: ${verticalScale(30)}px;

  flex: 1;
  padding-bottom: ${verticalScale(20)}px;
`;

export const TitleContainer = styled.View`
  padding: ${moderateScale(10)}px;
`;

export const CircleButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${moderateScale(40)}px;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const TextContainer = styled.View`
  flex: 1;
`;

interface StatusViewProps {
  color: string;
}
export const AuthorWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${verticalScale(5)}px;
`;

export const StatusView = styled.View<StatusViewProps>`
  background-color: ${(props) =>
    props.color === 'light'
      ? props.theme.colors.light
      : props.theme.colors.statusRed};
  height: ${moderateScale(20)}px;
  width: ${moderateScale(120)}px;
  justify-content: center;
  align-items: center;
  border-radius: ${moderateScale(25)}px;
  margin-bottom: ${moderateScale(10)}px;
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
