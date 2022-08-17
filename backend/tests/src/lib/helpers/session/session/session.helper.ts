class Session<T extends object> {
  #data: Partial<T>;

  public constructor();

  public constructor(data: T);

  public constructor(data: T = {} as T) {
    this.#data = data;
  }

  public get(key: keyof T): T[typeof key] | undefined {
    return this.#data[key];
  }

  public set(key: keyof T, value: T[typeof key]): void {
    this.#data[key] = value;
  }

  public remove(key: keyof T): void {
    this.#data[key] = undefined;
  }
}

export { Session };
