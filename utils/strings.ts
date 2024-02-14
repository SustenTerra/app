export function getFirstAndLastName(fullName: string) {
  const [firstName, ...lastName] = fullName.split(' ');
  return {
    firstName,
    lastName: lastName.join(' '),
  };
}
