import React, { FC, ReactElement } from 'react';

import { AppScreenName } from '~/common/enums/enums';
import { Icon } from '~/components/common/common';

type Props = {
  name: AppScreenName;
  color: string;
  width: number;
  height: number;
};

const IconToDrawerItem: FC<Props> = ({
  name,
  color,
  width,
  height,
}): ReactElement | null => {
  switch (name) {
    case AppScreenName.OVERVIEW: {
      return <Icon name="home" color={color} width={width} height={height} />;
    }

    case AppScreenName.COURSES: {
      return <Icon name="book" color={color} width={width} height={height} />;
    }

    case AppScreenName.MENTORS: {
      return (
        <Icon name="mentors" color={color} width={width} height={height} />
      );
    }

    case AppScreenName.MY_EDUCATION: {
      return (
        <Icon name="education" color={color} width={width} height={height} />
      );
    }

    case AppScreenName.SETTINGS: {
      return (
        <Icon name="settings" color={color} width={width} height={height} />
      );
    }

    case AppScreenName.BILLING: {
      return (
        <Icon name="billing" color={color} width={width} height={height} />
      );
    }
  }

  return null;
};

export { IconToDrawerItem };
