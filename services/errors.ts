import { showMessage } from './messages';

import { ApiError } from '@/api';

const DEFAULT_ERROR_MESSAGE =
  'Ocorreu um erro inesperado, tente novamente mais tarde!';

const errorPatterns = [
  {
    pattern: "'[A-z0-9_.\\-]+@[A-z0-9]+\\.[A-z]+(\\.[A-z]+)*'",
    message: 'Email inválido, verifique o email informado.',
  },
  {
    pattern: 'Given current password do not match actual user password',
    message: 'Email ou senha inválidos, verifique os dados informados.',
  },
];

export function showErrors(error: unknown) {
  let detail = DEFAULT_ERROR_MESSAGE;
  if (error instanceof ApiError) {
    const foundDetail = error.body.detail;

    if (foundDetail) {
      if (typeof foundDetail === 'string') {
        detail = foundDetail;
      }

      if (Array.isArray(foundDetail) && foundDetail.length > 0) {
        detail = foundDetail[0].msg;
      }
    }
  }

  for (const pattern of errorPatterns) {
    if (detail && detail.includes(pattern.pattern)) {
      detail = pattern.message;
      break;
    }
  }

  showMessage({
    type: 'danger',
    title: 'Atenção!',
    message: detail,
  });
}
