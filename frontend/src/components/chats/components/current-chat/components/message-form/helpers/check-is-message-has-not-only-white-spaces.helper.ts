const checkIsMessageHasNotOnlyWhiteSpaces = (message: string): boolean => {
  const hasOnlyWhiteSpaces = Boolean(message.trim());

  return hasOnlyWhiteSpaces;
};

export { checkIsMessageHasNotOnlyWhiteSpaces };
