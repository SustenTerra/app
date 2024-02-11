import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

interface ToastOptions {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}

export function useToast({ type, title, message }: ToastOptions) {
  const types = {
    success: ALERT_TYPE.SUCCESS,
    error: ALERT_TYPE.DANGER,
    warning: ALERT_TYPE.WARNING,
    info: ALERT_TYPE.INFO,
  };

  const show = () => {
    Toast.show({
      type: types[type],
      title,
      textBody: message,
    });
  };

  return { show };
}
