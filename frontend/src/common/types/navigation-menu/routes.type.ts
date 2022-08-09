import { SubNavigationMenuItem } from './subroutes.type';

type NavigationMenuItem = {
  name: string;
  subroutes: SubNavigationMenuItem[];
};

export { NavigationMenuItem };
