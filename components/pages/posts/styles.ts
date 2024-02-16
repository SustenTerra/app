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
