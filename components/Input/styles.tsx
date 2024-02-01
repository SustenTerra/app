import styled from 'styled-components/native';

import { horizontalScale, moderateScale } from '@/utils/scale';

export const Container = styled.View`
    padding: ${moderateScale(20)}px;
    flex-direction: row;
    background-color: white;
    border-radius: ${moderateScale(20)}px;
    width: 100%;
    align-items: center;
    gap: ${horizontalScale(10)}px;
`;

export const TextInput = styled.TextInput`
    border: none;
    flex: 1;
    font-size: ${moderateScale(20)}px;
`;
