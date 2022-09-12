const checkMessageHasOnlyWhiteSpaces = (message: string): boolean => {
  const onlyWhiteSpacesPattern = /^\s*$/;

  return onlyWhiteSpacesPattern.test(message);
};

export { checkMessageHasOnlyWhiteSpaces };
