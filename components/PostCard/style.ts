import styled from 'styled-components/native';

import { horizontalScale } from '@/utils/scale';

export const Container = styled.View``;

export const TextContainer = styled.View``;

export const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 ${horizontalScale(10)}px;
`;
