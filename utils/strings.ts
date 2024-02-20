export function getFirstAndLastName(fullName: string) {
  const [firstName, ...lastName] = fullName.split(' ');
  return {
    firstName,
    lastName: lastName.join(' '),
  };
}

export function getCentsInCurrencyString(currencyString: string) {
  return parseInt(currencyString.replace(/\D/g, ''), 10);
}

export function formatCurrencyString(currencyString: string) {
  const val = parseInt(currencyString.replace(/\D/g, ''), 10) / 100;
  return 'R$ ' + val.toFixed(2).toString().replace('.', ',');
}
