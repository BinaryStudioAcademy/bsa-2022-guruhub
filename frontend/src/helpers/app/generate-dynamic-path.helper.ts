import { AppRoute } from 'common/enums/enums';

const generateDynamicPath = (
  route: AppRoute,
  params: Record<string, string | number>,
): AppRoute => {
  return Object.entries(params).reduce((path, [key, value]) => {
    return path.replace(`:${key}`, encodeURIComponent(value)) as AppRoute;
  }, route);
};

export { generateDynamicPath };
