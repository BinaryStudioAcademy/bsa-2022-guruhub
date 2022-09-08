const getRandomArrayElement = <T>(array: T[]): T => {
  const random = Math.random();
  const randomIndex = Math.floor(array.length * random);

  return array[randomIndex];
};

export { getRandomArrayElement };
