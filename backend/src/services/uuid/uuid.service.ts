import { v4 as uuid4 } from 'uuid';

class Uuid {
  public createUuid(): string {
    return uuid4();
  }
}

export { Uuid };
