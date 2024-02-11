import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { StyleProp, TextStyle } from 'react-native';

import { Container, TextInput } from './styles';

type IconNameOptions = 'user' | 'mail' | 'message-circle' | 'lock' | 'search';

interface InputProps {
  iconName: IconNameOptions;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  hideText?: boolean;
  style?: StyleProp<TextStyle>;
}

function Input({
  iconName,
  placeholder,
  value,
  onChange,
  hideText = false,
  ...props
}: InputProps) {
  const [showInput, setShowInput] = useState(!hideText);

  return (
    <Container {...props}>
      {iconName && <Feather name={iconName} size={24} />}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        secureTextEntry={!showInput}
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
