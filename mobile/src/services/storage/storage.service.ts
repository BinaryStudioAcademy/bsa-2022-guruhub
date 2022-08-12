import { NativeMMKV } from 'react-native-mmkv';

import { StorageKey } from '~/common/enums/enums';

type Constructor = {
  storage: NativeMMKV;
};

class Storage {
  #storage: NativeMMKV;

  constructor({ storage }: Constructor) {
    this.#storage = storage;
  }

  public get(key: StorageKey): string | null {
    return this.#storage.getString(key) ?? null;
  }

  public set(key: StorageKey, value: string): void {
    return this.#storage.set(key, value);
  }

  public delete(key: StorageKey): void {
    return this.#storage.delete(key);
  }
}

export { Storage };
