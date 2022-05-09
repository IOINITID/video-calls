export const getHiddenUserEmail = (email: string) => {
  const firstPartEndIndex = email.search('@');
  const hiddenValues = Array(firstPartEndIndex).fill('*').join('');

  return hiddenValues + email.slice(firstPartEndIndex);
};
