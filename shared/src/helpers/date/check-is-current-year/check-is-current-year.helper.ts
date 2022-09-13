const checkIsCurrentYear = (date: Date): boolean => {
  const currentYear = new Date().getFullYear();
  const yearToCompare = date.getFullYear();

  return yearToCompare === currentYear;
};

export { checkIsCurrentYear };
