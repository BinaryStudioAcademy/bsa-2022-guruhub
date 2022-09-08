import { v4 as uuid4 } from 'uuid';

const createUuid = (): string => {
  return uuid4();
};

export { createUuid };
