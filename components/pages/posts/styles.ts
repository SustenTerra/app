import styled from 'styled-components/native';

import { horizontalScale, moderateScale, verticalScale } from '@/utils/scale';

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
`;

export const NewPostContainer = styled.SafeAreaView`
  margin: ${moderateScale(10)}px;
  gap: ${moderateScale(10)}px;
`;

export const ImageForeGround = styled.View`
  position: absolute;
  height: 50%;
  bottom: 0;
  background-color: ${(props) => props.theme.colors.secondary};
  opacity: 0.7;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const PostsGridHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${horizontalScale(10)}px;
  margin-bottom: ${verticalScale(10)}px;
`;

export const FilterButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${moderateScale(40)}px;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const ImagePostView = styled.Image`
  height: 60%;
  width: 100%;
`;

export const PostInfoWrapper = styled.View`
  width: 100%;
  padding: ${moderateScale(20)}px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
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

export const HeaderPostView = styled.SafeAreaView`
  width: 100%;
  position: absolute;
  z-index: 2;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
