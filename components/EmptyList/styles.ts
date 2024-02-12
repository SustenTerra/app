import styled from 'styled-components/native';

import { verticalScale } from '@/utils/scale';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${verticalScale(200)}px;
`;
