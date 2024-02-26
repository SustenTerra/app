import * as Speech from 'expo-speech';

export function speak(text: string) {
  const normalizedText = text
    .replaceAll('-', ' ')
    .replaceAll('\\n', ' ')
    .replaceAll('#', ' ');

  Speech.speak(normalizedText, {
    language: 'pt-BR',
  });
}

export function stop() {
  Speech.stop();
}

export function isSpeaking() {
  return Speech.isSpeakingAsync();
}

export function pause() {
  Speech.pause();
}

export function resume() {
  Speech.resume();
}
