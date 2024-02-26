import * as Speech from 'expo-speech';

export function speak(text: string) {
  Speech.getAvailableVoicesAsync().then((voices) => {
    console.log(voices);
  });

  Speech.speak(text, {
    language: 'pt-BR',
  });
}
