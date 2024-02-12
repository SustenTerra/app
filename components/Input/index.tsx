import Feather from '@expo/vector-icons/Feather';
import { useRef, useState } from 'react';
import { StyleProp, TextStyle, TextInput as RNTextInput } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Container, TextInput } from './styles';

type IconNameOptions = 'user' | 'mail' | 'message-circle' | 'lock' | 'search';

interface InputProps {
  iconName: IconNameOptions;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  hideText?: boolean;
  useSecondaryColors?: boolean;
  style?: StyleProp<TextStyle>;
}

function Input({
  iconName,
  placeholder,
  value,
  onChange,
  hideText = false,
  useSecondaryColors = false,
  ...props
}: InputProps) {
  const theme = useTheme();

  const inputRef = useRef<RNTextInput>(null);
  const [showInput, setShowInput] = useState(!hideText);

  return (
    <Container {...props} onPress={() => inputRef.current?.focus()}>
      {iconName && (
        <Feather
          name={iconName}
          size={24}
          color={
            useSecondaryColors ? theme.colors.secondary : theme.colors.dark
          }
        />
      )}
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        secureTextEntry={!showInput}
        placeholderTextColor={
          useSecondaryColors ? theme.colors.secondary : theme.colors.textBody
        }
        onEndEditing={() => console.log('oii')}
      />
      {hideText && (
        <Feather
          name={showInput ? 'eye-off' : 'eye'}
          size={24}
          onPress={() => setShowInput(!showInput)}
        />
      )}
    </Container>
  );
}

export default Input;
