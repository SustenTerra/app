import { Link as ExpoLink } from 'expo-router';
import styled from 'styled-components/native';

import { horizontalScale, moderateScale, verticalScale } from '@/utils/scale';

export const Wrapper = styled.SafeAreaView`
  position: fixed;
  background-color: ${(props) => props.theme.colors.secondary};
  flex-direction: row;
  justify-content: space-around;
`;

export const Link = styled(ExpoLink)`
  color: ${(props) => props.theme.colors.light};
  padding: ${moderateScale(10)}px;
  margin: ${moderateScale(10)}px;
`;
