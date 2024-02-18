import styled from 'styled-components/native';

import { horizontalScale, verticalScale } from '@/utils/scale';

export const ProfileInfoContainer = styled.SafeAreaView`
  width: 100%;
  margin: ${verticalScale(60)}px 0;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  min-height: ${verticalScale(60)}px;
`;

export const DataWrapper = styled.View`
  margin-left: ${horizontalScale(10)}px;
`;

export const ProfileButtonContainer = styled.TouchableOpacity`
  width: 100%;
  margin: ${verticalScale(10)}px 0;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  padding-left: ${horizontalScale(20)}px;
`;
