import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';

import { InterviewScreenName } from '~/common/enums/enums';
import {
  CoursesNavigationItem,
  InterviewsNavigationParamList,
} from '~/common/types/types';
import { getPermittedScreens, getScreensByAuth } from '~/helpers/helpers';
import { useAppSelector, useMemo } from '~/hooks/hooks';

import { INTERVIEW_SCREENS, SCREEN_OPTIONS } from './common/constants';

const Interviews: FC = () => {
  const NativeStack =
    createNativeStackNavigator<InterviewsNavigationParamList>();

  const { user } = useAppSelector((state) => state.auth);

  const userPermissions = user?.permissions ?? [];

  const allowedScreens: CoursesNavigationItem[] = useMemo(() => {
    const screensByAuth = getScreensByAuth(INTERVIEW_SCREENS, Boolean(user));

    const permittedScreens = getPermittedScreens(
      screensByAuth,
      userPermissions,
    );

    return permittedScreens;
  }, [user]);

  return (
    <NativeStack.Navigator screenOptions={SCREEN_OPTIONS}>
      {allowedScreens.map((screen) => {
        return (
          <NativeStack.Screen
            key={screen.name}
            name={screen.name as InterviewScreenName}
            component={screen.component}
            options={screen.options}
          />
        );
      })}
    </NativeStack.Navigator>
  );
};

export { Interviews };
