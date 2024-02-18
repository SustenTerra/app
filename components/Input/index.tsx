import Feather from '@expo/vector-icons/Feather';
import { useRef, useState } from 'react';
import {
  StyleProp,
  TextStyle,
  TextInput as RNTextInput,
  TextInputProps,
} from 'react-native';
import { useTheme } from 'styled-components/native';

import { Container, TextInput } from './styles';

import { moderateScale } from '@/utils/scale';

type IconNameOptions =
  | 'user'
  | 'mail'
  | 'message-circle'
  | 'lock'
  | 'search'
  | 'map-pin'
  | 'tag'
  | 'info'
  | 'edit';

interface InputProps extends TextInputProps {
  iconName?: IconNameOptions;
  placeholder: string;
  hideText?: boolean;
  useSecondaryColors?: boolean;
  useFlex?: boolean;
  clearable?: boolean;
  style?: StyleProp<TextStyle>;
}

function Input({
  iconName,
  placeholder,
  hideText = false,
  useSecondaryColors = false,
  useFlex = false,
  clearable = false,
  multiline = false,
  value,
  onChangeText,
  ...props
}: InputProps) {
  const theme = useTheme();

  const inputRef = useRef<RNTextInput>(null);
  const [showInput, setShowInput] = useState(!hideText);

  const iconColor = useSecondaryColors
    ? theme.colors.secondary
    : theme.colors.dark;

  return (
    <Container
      onPress={() => inputRef.current?.focus()}
      useFlex={useFlex}
      isMultiline={multiline}
    >
      {iconName && (
        <Feather name={iconName} size={moderateScale(20)} color={iconColor} />
      )}

      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showInput}
        multiline={multiline}
        placeholderTextColor={
          useSecondaryColors ? theme.colors.secondary : theme.colors.textBody
        }
        {...props}
      />

      {hideText && (
        <Feather
          name={showInput ? 'eye-off' : 'eye'}
          size={24}
          onPress={() => setShowInput(!showInput)}
          color={iconColor}
        />
      )}

      {!hideText && clearable && !!value && (
        <Feather
          name="delete"
          size={24}
          onPress={() => onChangeText?.('')}
          color={iconColor}
        />
      )}
    </Container>
  );
}

export default Input;
