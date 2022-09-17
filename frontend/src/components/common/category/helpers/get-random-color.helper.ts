const getRandomColor = (): string => {
  const colors = ['#F6C648', '#2563EB', '#15BE4F', '#C565C7'];

  return colors[Math.floor(Math.random() * colors.length)];
};

export { getRandomColor };
