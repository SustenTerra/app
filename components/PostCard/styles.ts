import styled from 'styled-components/native';

import { horizontalScale, verticalScale } from '@/utils/scale';

interface ContainerProps {
  width: number;
}

export const Container = styled.View<ContainerProps>`
  width: ${({ width }) => width}px;
`;

export const TextContainer = styled.View``;

export const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 ${horizontalScale(10)}px;
  margin-top: ${verticalScale(5)}px;
`;
