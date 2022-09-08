import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { FC } from 'react';

import { CourseScreenName } from '~/common/enums/enums';
import { CourseNavigationParamList } from '~/common/types/types';
import { BackButton } from '~/components/common/common';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useEffect,
  useMemo,
} from '~/hooks/hooks';
import { coursesActions } from '~/store/actions';

import { COURSE_TAB_ITEMS, SCREEN_OPTIONS } from './common/constants';
import { getPermittedScreens } from './helpers/helpers';

const Tab = createMaterialTopTabNavigator<CourseNavigationParamList>();

const Course: FC = () => {
  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();

  const { user, userPermissions, course, isMentor } = useAppSelector(
    ({ auth, courses }) => ({
      user: auth.user,
      userPermissions: auth.user?.permissions ?? [],
      course: courses.course,
      isMentor: courses.isMentor,
    }),
  );

  const allowedScreens = useMemo(() => {
    const permittedScreens = user
      ? getPermittedScreens(COURSE_TAB_ITEMS, userPermissions)
      : COURSE_TAB_ITEMS.filter(({ name }) => name === CourseScreenName.ABOUT);

    const screenNameToFilter = isMentor
      ? CourseScreenName.MY_MENTOR
      : CourseScreenName.MY_STUDENTS;

    return permittedScreens.filter(({ name }) => name !== screenNameToFilter);
  }, [userPermissions, isMentor]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={navigation.goBack} />,
    });
  }, []);

  useEffect(() => {
    if (course) {
      dispatch(coursesActions.checkIsMentor({ id: course.id }));
    }
  }, [course]);

  return (
    <Tab.Navigator
      screenOptions={SCREEN_OPTIONS}
      initialRouteName={CourseScreenName.ABOUT}
    >
      {allowedScreens.map((screen) => {
        return (
          <Tab.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export { Course };
