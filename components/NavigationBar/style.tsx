import { Link } from 'expo-router';
import styled from 'styled-components/native';

import { horizontalScale, moderateScale, verticalScale } from '@/utils/scale';

export const Wrapper = styled.SafeAreaView`
  background-color: ${(props) => props.theme.colors.secondary};
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

export const Tab = styled(Link)`
  display: flex;
  color: ${(props) => props.theme.colors.light};
  padding: ${moderateScale(16)}px;
  margin: ${moderateScale(10)}px;
  align-items: center;
  justify-content: center;
  gap: ${moderateScale(8)}px;
`;

export const SelectedTab = styled(Tab)`
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: ${moderateScale(30)}px;
`;
