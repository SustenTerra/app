import Feather from '@expo/vector-icons/Feather';
import { useTheme } from 'styled-components/native';

import { Container } from './styles';

import { speak } from '@/services/speak';

interface SpeakButtonProps {
  color?: 'primary' | 'light';
  textToSpeak?: string;
}

function SpeakButton({ color = 'primary', textToSpeak }: SpeakButtonProps) {
  const theme = useTheme();

  const onPress = () => {
    if (textToSpeak) {
      speak(textToSpeak);
    }
  };

  return (
    <Container onPress={onPress} marginRight={10} color={color}>
      <Feather
        name="volume-2"
        size={24}
        color={color === 'primary' ? theme.colors.light : theme.colors.dark}
      />
    </Container>
  );
}

export default SpeakButton;
