import { matchPath, resolvePath } from 'react-router-dom';

const areTheSamePaths = (currentPath: string, href: string): boolean => {
  const resolvedPath = resolvePath(href);

  return Boolean(matchPath(resolvedPath.pathname, currentPath));
};

export { areTheSamePaths };
