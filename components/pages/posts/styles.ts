import styled from 'styled-components/native';

import { horizontalScale } from '@/utils/scale';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  align-items: center;
  justify-content: center;
`;

export const Header = styled.View`
  flex-direction: row;
  gap: ${horizontalScale(5)}px;
`;

export const SearchWrapper = styled.View``;
