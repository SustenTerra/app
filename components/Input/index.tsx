import Feather from '@expo/vector-icons/Feather';
import { ReactNode } from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInputChangeEventData,
  TextStyle,
} from 'react-native';

import { Container, TextInput } from './styles';

type IconNameOptions = 'user' | 'mail' | 'message-circle' | 'lock' | 'search';

interface InputProps {
  iconName: IconNameOptions;
  placeholder: string;
  value: string;

  onChange: (text: string) => void;
  style?: StyleProp<TextStyle>;
}

function Input({
  iconName,
  placeholder,
  value,
  onChange,
  ...props
}: InputProps) {
  return (
    <Container {...props}>
      {iconName && <Feather name={iconName} size={24} />}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
      />
    </Container>
  );
}

export default Input;
