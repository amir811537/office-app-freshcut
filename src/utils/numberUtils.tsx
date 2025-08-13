export const toBanglaNumber = (input: string | number): string => {
  const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

  return input
    .toString()
    .split('')
    .map(char => {
      const index = englishDigits.indexOf(char);
      return index !== -1 ? banglaDigits[index] : char;
    })
    .join('');
};
