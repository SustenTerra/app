import { showMessage } from 'react-native-flash-message';

import { ApiError } from '@/api';

const DEFAULT_ERROR_MESSAGE =
  'Ocorreu um erro inesperado, tente novamente mais tarde!';

const errorPatterns = [
  {
    pattern: "'[A-z0-9_.\\-]+@[A-z0-9]+\\.[A-z]+(\\.[A-z]+)*'",
    message: 'Email inválido, verifique o email informado.',
  },
];

export function showErrors(error: unknown) {
  let detail = DEFAULT_ERROR_MESSAGE;
  if (error instanceof ApiError) {
    detail =
      error.body.detail && error.body.detail.length > 0
        ? error.body.detail[0].msg
        : detail;
  }

  for (const pattern of errorPatterns) {
    if (detail.includes(pattern.pattern)) {
      detail = pattern.message;
      break;
    }
  }

  showMessage({
    type: 'danger',
    message: 'Erro',
    description: detail,
  });
}
