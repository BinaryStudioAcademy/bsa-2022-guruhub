import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { FC } from 'react';

import { CourseScreenName } from '~/common/enums/enums';
import { CourseNavigationParamList } from '~/common/types/types';
import { BackButton } from '~/components/common/common';
import { getPermittedScreens, getScreensByAuth } from '~/helpers/helpers';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useCallback,
  useEffect,
  useFocusEffect,
  useMemo,
} from '~/hooks/hooks';
import { coursesActions } from '~/store/actions';

import { COURSE_TAB_ITEMS, SCREEN_OPTIONS } from './common/constants/constants';

const Tab = createMaterialTopTabNavigator<CourseNavigationParamList>();

const Course: FC = () => {
  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();

  const { user, course, isMentor, mentors } = useAppSelector(
    ({ auth, courses }) => ({
      user: auth.user,
      course: courses.course,
      mentors: courses.mentors,
      isMentor: courses.isMentor,
    }),
  );

  const userPermissions = user?.permissions ?? [];

  const allowedScreens = useMemo(() => {
    const screensByAuth = getScreensByAuth(COURSE_TAB_ITEMS, Boolean(user));
    const permittedScreens = getPermittedScreens(
      screensByAuth,
      userPermissions,
    );

    const screenNameToFilter = isMentor
      ? CourseScreenName.MY_MENTOR
      : CourseScreenName.MY_STUDENTS;

    return permittedScreens.filter(({ name }) => name !== screenNameToFilter);
  }, [userPermissions, isMentor, user]);

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

  useFocusEffect(
    useCallback(() => {
      dispatch(coursesActions.updateVisibilityBecomeMentor());
    }, [mentors]),
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(coursesActions.setBecomeMentorInvisible());
      };
    }, []),
  );

  return (
    <Tab.Navigator
      screenOptions={SCREEN_OPTIONS}
      initialRouteName={CourseScreenName.ABOUT}
    >
      {allowedScreens.map((screen) => {
        return (
          <Tab.Screen
            key={screen.name}
            name={screen.name as CourseScreenName}
            component={screen.component}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export { Course };
