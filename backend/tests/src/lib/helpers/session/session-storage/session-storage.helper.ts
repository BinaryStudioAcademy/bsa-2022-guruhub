import { Session } from '../session/session.helper';

class SessionStorage<T extends object> {
  #sessions: Record<string, Session<T>> = {};

  #currentSessionName: string | null = null;

  public get isInSession(): boolean {
    return this.#currentSessionName !== null;
  }

  protected get session(): Session<T> {
    this.#throwIfNotInSession();

    return this.#sessions[this.#currentSessionName as string];
  }

  public sessionExists(name: string): boolean {
    return Boolean(this.#sessions[name]);
  }

  public addSession(name: string, initialData: T = {} as T): void {
    if (this.sessionExists(name)) {
      throw new Error('Session already exists');
    }

    this.#sessions[name] = new Session<T>(initialData);
  }

  public removeSession(name: string): void {
    if (!this.sessionExists(name)) {
      throw new Error('No sessions with given name exist');
    }

    if (this.#currentSessionName === name) {
      this.exitSession();
    }

    delete this.#sessions[name];
  }

  public enterSession(name: string): void {
    if (!this.sessionExists(name)) {
      throw new Error('No sessions with given name exist');
    }

    this.#currentSessionName = name;
  }

  public exitSession(): void {
    this.#currentSessionName = null;
  }

  public addAndEnterSession(name: string): void {
    this.addSession(name);
    this.enterSession(name);
  }

  public enterSessionAndRemovePrevious(name: string): void {
    this.#throwIfNotInSession();
    this.removeSession(this.#currentSessionName as string);
    this.enterSession(name);
  }

  public get(key: keyof T): T[typeof key] | undefined {
    return this.session.get(key);
  }

  public set(key: keyof T, value: T[typeof key]): void {
    this.session.set(key, value);
  }

  public remove(key: keyof T): void {
    this.session.remove(key);
  }

  #throwIfNotInSession(): void {
    if (!this.isInSession) {
      throw new Error('Not in session');
    }
  }
}

export { SessionStorage };
