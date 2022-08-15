const getRandomColor = (): string => {
  const colors = ['yellow', 'blue', 'red', 'green', 'white', 'pink'];

  return colors[Math.floor(Math.random() * colors.length)];
};

export { getRandomColor };
