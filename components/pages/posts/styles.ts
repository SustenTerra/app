import styled from 'styled-components/native';

import {
  height,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/utils/scale';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  align-items: center;
  margin-top: ${verticalScale(50)}px;
  gap: ${moderateScale(10)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  gap: ${horizontalScale(5)}px;
  align-items: center;
`;

export const SearchWrapper = styled.View`
  width: 95%;
`;

export const PostsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${moderateScale(10)}px;
  width: 100%;
  padding: 0 ${horizontalScale(10)}px;
  padding-bottom: ${verticalScale(30)}px;
`;

export const BackButtonWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const NewPostContainer = styled.SafeAreaView`
  margin: ${moderateScale(10)}px;
  gap: ${moderateScale(20)}px;
  padding: ${verticalScale(30)}px 0;
`;

export const EditAddressContainer = styled.View`
  margin: ${moderateScale(10)}px;
  gap: ${moderateScale(10)}px;
`;

export const PostsGridHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${horizontalScale(10)}px;
  margin-bottom: ${verticalScale(10)}px;
`;

export const CircleButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${moderateScale(40)}px;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const ImagePostView = styled.Image`
  height: ${height * 0.6}px;
  width: 100%;

  border-bottom-left-radius: ${moderateScale(45)}px;
  border-bottom-right-radius: ${moderateScale(45)}px;
`;

export const PostInfoWrapper = styled.View`
  width: 100%;
  padding: ${moderateScale(20)}px;
`;

interface RowProps {
  paddingTop?: number;
}

export const Row = styled.View<RowProps>`
  flex-direction: row;
  align-items: center;
  padding-top: ${({ paddingTop = 0 }) => verticalScale(paddingTop)}px;
`;

export const ContactBar = styled.SafeAreaView`
  background-color: ${(props) => props.theme.colors.secondary};
  width: 100%;
  position: absolute;
  bottom: 0;
`;

export const BarContent = styled.Pressable`
  flex-direction: row;
  width: 100%;
  gap: ${moderateScale(10)}px;
  padding: ${moderateScale(20)}px;
  align-items: center;
  justify-content: center;
`;

export const HeaderSafeAreaView = styled.SafeAreaView`
  width: 100%;
  position: absolute;
  z-index: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const HeaderPostView = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  padding: ${verticalScale(10)}px 0;
`;

export const NewPostTitleWrapper = styled.View`
  margin-bottom: ${verticalScale(10)}px;
`;

interface PostsSpacerProps {
  multiplier?: number;
}

export const PostsSpacer = styled.SafeAreaView<PostsSpacerProps>`
  height: ${({ multiplier = 1 }) => verticalScale(20) * multiplier}px;
`;

export const PostsGridHeaderWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${moderateScale(10)}px;
`;
