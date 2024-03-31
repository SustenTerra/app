import styled from 'styled-components/native';

import { horizontalScale, moderateScale, verticalScale } from '@/utils/scale';

export const Container = styled.View`
  width: 100%;
`;

export const StyledPicker = styled.View`
  width: 100%;
  min-height: ${verticalScale(60)}px;
  border-radius: ${moderateScale(60)}px;
  background-color: ${({ theme }) => theme.colors.light};
  align-items: center;
  flex-direction: row;
  padding: 0 ${horizontalScale(16)}px;
`;

export const LabelWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${verticalScale(8)}px;
`;
