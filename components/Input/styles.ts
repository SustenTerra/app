import styled from 'styled-components/native';

import { webOnlyCSS } from '@/utils/platform';
import { horizontalScale, moderateScale } from '@/utils/scale';

interface ContainerProps {
  useFlex?: boolean;
  isMultiline?: boolean;
}

export const Container = styled.Pressable<ContainerProps>`
  padding: ${moderateScale(15)}px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${(props) =>
    props.isMultiline ? moderateScale(25) : moderateScale(100)}px;
  ${({ useFlex }) => (useFlex ? 'flex: 1;' : 'width: 100%;')}
  align-items: ${({ isMultiline }) => (isMultiline ? 'flex-start' : 'center')};
  gap: ${horizontalScale(10)}px;

  ${(props) => props.isMultiline && 'min-height: 100px;'}
  ${(props) => props.isMultiline && 'max-height: 300px;'}
`;

export const TextInput = styled.TextInput`
  border: none;
  flex: 1;
  font-size: ${moderateScale(16)}px;
  padding: 0;

  ${webOnlyCSS`
    outline-style: none;
  `}
`;
