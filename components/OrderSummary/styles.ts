import styled from 'styled-components/native';

import { moderateScale, verticalScale } from '@/utils/scale';

export const OrderSummaryContainer = styled.View`
  width: 90%;
  background-color: ${({ theme }) => theme.colors.light};
  padding: ${moderateScale(20)}px;
  border-radius: ${moderateScale(10)}px;
  margin-bottom: ${verticalScale(16)}px;
`;

export const BlackLine = styled.View`
  width: 100%;
  height: ${moderateScale(1)}px;
  background-color: ${({ theme }) => theme.colors.dark};
  margin: ${moderateScale(10)}px 0;
`;
