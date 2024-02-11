import styled from 'styled-components/native';

import { moderateScale } from '@/utils/scale';

export const Container = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 0 ${moderateScale(20)}px;
  gap: ${moderateScale(5)}px;
  align-items: center;
  justify-content: center;
`;
