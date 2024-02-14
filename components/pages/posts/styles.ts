import styled from 'styled-components/native';

import { horizontalScale, moderateScale, verticalScale } from '@/utils/scale';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  align-items: center;
  margin: ${moderateScale(10)}px;
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
  gap: ${moderateScale(10)}px;
`;

export const ButtonsWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const NewPostContainer = styled.SafeAreaView`
  margin: ${moderateScale(10)}px;
  gap: ${moderateScale(10)}px;
`;
