import { SubNavigationMenuItem } from './subnavigation-menu-item.type';

type NavigationMenuItem = {
  name: string;
  subroutes: SubNavigationMenuItem[];
};

export { NavigationMenuItem };
