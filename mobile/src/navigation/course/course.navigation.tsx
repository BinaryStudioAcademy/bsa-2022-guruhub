import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { FC } from 'react';

import { MIN_SCREENS_COUNT_FOR_TABS } from '~/common/constants/constants';
import { CourseTabsName } from '~/common/enums/enums';
import { CourseTabNavigationParamList } from '~/common/types/types';
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
import { courseModulesActions, coursesActions } from '~/store/actions';

import { COURSE_TAB_ITEMS, SCREEN_OPTIONS } from './common/constants/constants';

const Tab = createMaterialTopTabNavigator<CourseTabNavigationParamList>();

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
      ? CourseTabsName.MY_MENTOR
      : CourseTabsName.MY_STUDENTS;

    return permittedScreens.filter(({ name }) => name !== screenNameToFilter);
  }, [userPermissions, isMentor, user]);
  const isTabsShown = allowedScreens.length > MIN_SCREENS_COUNT_FOR_TABS;

  const handleLeaveCourseScreen = (): void => {
    dispatch(courseModulesActions.clearMentor());
    dispatch(coursesActions.clearTasks());
    dispatch(courseModulesActions.clearModules());
    dispatch(coursesActions.clearCurrentMenteeId());
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={handleLeaveCourseScreen} />,
      headerShown: true,
    });
    navigation.getParent()?.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    if (course) {
      dispatch(coursesActions.checkIsMentor({ id: course.id }));
    }
  }, [course]);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        dispatch(coursesActions.updateVisibilityBecomeMentor(user.id));
      }
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
      initialRouteName={CourseTabsName.ABOUT}
    >
      {allowedScreens.map((screen) => {
        return (
          <Tab.Screen
            key={screen.name}
            name={screen.name as CourseTabsName}
            component={screen.component}
            options={{
              tabBarStyle: { display: isTabsShown ? 'flex' : 'none' },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export { Course };
