import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { useLocation } from 'hooks/hooks';

import { GroupCreation } from './components/components';

const Uam: FC = () => {
  const { pathname } = useLocation();

  const getScreen = (screen: string): React.ReactElement | null => {
    switch (screen) {
      case AppRoute.UAM_CREATE_GROUP: {
        return <GroupCreation />;
      }
    }

    return null;
  };

  return <>{getScreen(pathname)}</>;
};

export { Uam };
