import styled from 'styled-components/native';

import { webOnlyCSS } from '@/utils/platform';
import { horizontalScale, moderateScale } from '@/utils/scale';

interface ContainerProps {
  useFlex?: boolean;
}

export const Container = styled.Pressable<ContainerProps>`
  padding: ${moderateScale(15)}px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${moderateScale(100)}px;
  ${({ useFlex }) => (useFlex ? 'flex: 1;' : 'width: 100%;')}
  align-items: center;
  gap: ${horizontalScale(10)}px;
`;

export const TextInput = styled.TextInput`
  border: none;
  flex: 1;
  font-size: ${moderateScale(16)}px;
  height: 100%;

  ${webOnlyCSS`
    outline-style: none;
  `}
`;
