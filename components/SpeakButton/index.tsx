import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { useTheme } from 'styled-components/native';

import { Container } from './styles';

import * as voice from '@/services/voice';

interface SpeakButtonProps {
  color?: 'primary' | 'light';
  textToSpeak?: string;
}

function SpeakButton({ color = 'primary', textToSpeak }: SpeakButtonProps) {
  const theme = useTheme();
  const [hasPlayed, setHasPlayed] = useState(false);

  const onPress = async () => {
    if (!textToSpeak) {
      return;
    }

    if (hasPlayed) {
      voice.stop();
      setHasPlayed(false);
    } else {
      voice.speak(textToSpeak);
      setHasPlayed(true);
    }
  };

  return (
    <Container onPress={onPress} marginRight={10} color={color}>
      <Feather
        name={hasPlayed ? 'pause' : 'volume-2'}
        size={24}
        color={color === 'primary' ? theme.colors.light : theme.colors.dark}
      />
    </Container>
  );
}

export default SpeakButton;
