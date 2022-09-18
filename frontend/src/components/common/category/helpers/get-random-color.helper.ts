const getRandomColorClassName = (): string => {
  const colorsClasses = ['blue', 'pink', 'green', 'yellow', 'lightYellow'];

  return colorsClasses[Math.floor(Math.random() * colorsClasses.length)];
};

export { getRandomColorClassName };
