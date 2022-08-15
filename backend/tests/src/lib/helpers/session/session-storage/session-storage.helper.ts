import { Session } from '../session/session.helper';

class SessionStorage<T extends object> {
  #sessions: Record<string, Session<T>> = {};
  #currentSessionName: string | null = null;

  get isInSession(): boolean {
    return this.#currentSessionName !== null;
  }

  protected get session(): Session<T> {
    this.#throwIfNotInSession();

    return this.#sessions[this.#currentSessionName as string];
  }

  sessionExists(name: string): boolean {
    return Boolean(this.#sessions[name]);
  }

  addSession(name: string, initialData: T = {} as T): void {
    if (this.sessionExists(name)) {
      throw new Error('Session already exists');
    }

    this.#sessions[name] = new Session<T>(initialData);
  }

  removeSession(name: string): void {
    if (!this.sessionExists(name)) {
      throw new Error('No sessions with given name exist');
    }

    if (this.#currentSessionName === name) {
      this.exit();
    }

    delete this.#sessions[name];
  }

  enterSession(name: string): void {
    if (!this.sessionExists(name)) {
      throw new Error('No sessions with given name exist');
    }

    this.#currentSessionName = name;
  }

  exit(): void {
    this.#currentSessionName = null;
  }

  addAndEnterSession(name: string): void {
    this.addSession(name);
    this.enterSession(name);
  }

  enterSessionAndRemoveSessionPrevious(name: string): void {
    this.#throwIfNotInSession();
    this.enterSession(name);
    this.removeSession(this.#currentSessionName as string);
  }

  get(key: keyof T): T[typeof key] | undefined {
    return this.session.get(key);
  }

  set(key: keyof T, value: T[typeof key]): void {
    this.session.set(key, value);
  }

  remove(key: keyof T): void {
    this.session.remove(key);
  }

  #throwIfNotInSession(): void {
    if (!this.isInSession) {
      throw new Error('Not in session');
    }
  }
}

export { SessionStorage };
