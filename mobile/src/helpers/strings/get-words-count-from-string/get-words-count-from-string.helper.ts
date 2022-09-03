const getWordsCountFromString = (
  wordsCount: number,
  string: string,
): string => {
  return `${string.split(' ').slice(0, wordsCount).join(' ')}...`;
};

export { getWordsCountFromString };
