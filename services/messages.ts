import {
  showMessage as RNShowMessage,
  MessageType,
} from 'react-native-flash-message';

interface ShowMessageProps {
  type: MessageType;
  title: string;
  message: string;
}

export function showMessage({ type, title, message }: ShowMessageProps) {
  RNShowMessage({
    type,
    message: title,
    description: message,
    hideStatusBar: true,
  });
}
