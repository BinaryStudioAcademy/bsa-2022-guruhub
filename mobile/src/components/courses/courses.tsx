import React, { FC, ReactElement } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import { AppColor, AppScreenName, DataStatus } from '~/common/enums/enums';
import { FAB, Spinner } from '~/components/common/common';
import { CourseCard } from '~/components/courses/components/components';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useCallback,
  useFocusEffect,
  useState,
} from '~/hooks/hooks';
import { coursesActions } from '~/store/actions';

import { styles } from './styles';

const Courses: FC = (): ReactElement => {
  const [isLoading] = useState(false);
  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();
  const { courses, dataStatus } = useAppSelector((state) => state.courses);

  const handleCoursesLoad = (): void => {
    dispatch(coursesActions.getCourses({ title: '', categoryKey: '' }));
  };

  const handleCourseCard = (): void => {
    //add onPress
  };

  const handleRefresh = (): void => {
    handleCoursesLoad();
  };

  const handleLoadMoreCourses = (): void => {
    //add fetch
  };

  const handleAddCourse = (): void => {
    navigation.navigate(AppScreenName.ADD_COURSE);
  };

  useFocusEffect(
    useCallback(() => {
      handleCoursesLoad();
    }, []),
  );

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner isOverflow />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={({ id }): string => id.toString()}
        renderItem={({ item: course }): ReactElement => (
          <CourseCard course={course} onCoursePress={handleCourseCard} />
        )}
        refreshControl={
          <RefreshControl
            colors={[AppColor.BRAND.BLUE_100]}
            refreshing={isLoading}
            onRefresh={handleRefresh}
          />
        }
        onEndReached={handleLoadMoreCourses}
        onEndReachedThreshold={0.1}
      />
      <FAB onPress={handleAddCourse} />
    </View>
  );
};

export { Courses };
