const checkMessageHasNotOnlyWhiteSpaces = (message: string): boolean => {
  const hasOnlyWhiteSpaces = Boolean(message.trim());

  return hasOnlyWhiteSpaces;
};

export { checkMessageHasNotOnlyWhiteSpaces };
