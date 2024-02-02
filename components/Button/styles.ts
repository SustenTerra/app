import styled from 'styled-components/native';

import { moderateScale, horizontalScale } from '@/utils/scale';

export type ColorOptions =
  | 'primary'
  | 'secondary'
  | 'dark'
  | 'light'
  | string;

interface ContainerProps {
  color: ColorOptions;
}

export const StyledButton = styled.Pressable<ContainerProps>`
    width: 100%;
    padding: ${moderateScale(16)}px;
    border-radius: 50%;
    color: ${(props) => props.theme.colors.light};
    background-color: ${(props) => {
        const colorsMap = new Map(Object.entries(props.theme.colors));

        if (colorsMap.has(props.color)) {
            return colorsMap.get(props.color);
        }

        return props.color;
    }};
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: ${horizontalScale(6)}px;
`;
