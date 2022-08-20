import { AppRoute } from 'common/enums/enums';
import { createBrowserHistory, History } from 'history';

class Navigation {
  #history: History;

  public constructor() {
    this.#history = createBrowserHistory();
  }

  public get history(): History {
    return this.#history;
  }

  public push(path: AppRoute): void {
    this.#history.push(path);
  }
}

export { Navigation };
