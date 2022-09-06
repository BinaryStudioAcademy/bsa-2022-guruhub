export const randint = (min: number, max: number): number => {
  const exclusiveMax = max + 1;
  const maxFromZero = exclusiveMax - min;
  const random = Math.random();
  const randomFromZero = Math.floor(maxFromZero * random);
  const randomFromMin = min + randomFromZero;

  return randomFromMin;
};
