const getSingularOrPluralWordFormatter =
  (isSingleElement: boolean) =>
  (word: string): string => {
    return `${word}${isSingleElement ? '' : 's'}`;
  };

const getItemsNotExistMessage = <T>(items: T[], itemsName: string): string => {
  const getSingularOrPluralWord = getSingularOrPluralWordFormatter(
    items.length === 1,
  );

  return `${getSingularOrPluralWord(itemsName)} with ${getSingularOrPluralWord(
    'id',
  )} ${items.join(', ')} not exist.`;
};

export { getItemsNotExistMessage };
