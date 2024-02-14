import styled from 'styled-components/native';

import { verticalScale } from '@/utils/scale';

interface ContainerProps {
  height?: number;
}

export const Container = styled.View<ContainerProps>`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${(props) => props.height || verticalScale(200)}px;
`;

export const LoadingIndicator = styled.ActivityIndicator``;

export const FlatContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;
