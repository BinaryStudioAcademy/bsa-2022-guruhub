class Session<T extends object> {
  #data: Partial<T>;

  constructor();
  constructor(data: T);
  constructor(data: T = {} as T) {
    this.#data = data;
  }

  get(key: keyof T): T[typeof key] | undefined {
    return this.#data[key];
  }

  set(key: keyof T, value: T[typeof key]): void {
    this.#data[key] = value;
  }

  remove(key: keyof T): void {
    this.#data[key] = undefined;
  }
}

export { Session };
