const removeHashtagFromId = (stringToChange: string): number => {
  const amount = 1;

  return Number(stringToChange.slice(amount));
};

export { removeHashtagFromId };
