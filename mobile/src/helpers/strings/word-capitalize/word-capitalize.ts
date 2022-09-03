const wordCapitalize = (word: string): string => {
  return word
    .toLowerCase()
    .replace(/\w/, (firstLetter) => firstLetter.toUpperCase());
};

export { wordCapitalize };
