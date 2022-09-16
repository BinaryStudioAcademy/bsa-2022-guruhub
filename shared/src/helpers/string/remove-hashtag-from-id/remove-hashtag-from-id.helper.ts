const removeHashtagFromId = (stringToChange: string): number => {
  const hashtagIndex = 1;

  return Number(stringToChange.slice(hashtagIndex));
};

export { removeHashtagFromId };
