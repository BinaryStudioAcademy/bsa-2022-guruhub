import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import { AppColor, DataStatus } from '~/common/enums/enums';
import { Spinner } from '~/components/common/common';
import {
  AddCourseButton,
  CourseCard,
} from '~/components/courses/components/components';
import { useAppDispatch, useAppSelector, useFocusEffect } from '~/hooks/hooks';
import { coursesActions } from '~/store/actions';

import { styles } from './styles';

const Courses: FC = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    handleCoursesLoad();
  }, [dispatch, setIsLoading]);

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
      <AddCourseButton />
    </View>
  );
};

export { Courses };
