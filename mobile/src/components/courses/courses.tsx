import React, { FC, ReactElement, useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import { AppColor, DataStatus } from '~/common/enums/enums';
import { Spinner } from '~/components/common/common';
import { CourseCard } from '~/components/courses/components/components';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { coursesActions } from '~/store/actions';

import { styles } from './styles';

const Courses: FC = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { courses, dataStatus } = useAppSelector((state) => state.courses);

  const handleCoursesLoad = async (): Promise<void> => {
    setIsLoading(true);
    await dispatch(coursesActions.getCourses({}))
      .unwrap()
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleCoursesLoad();
  }, [dispatch, setIsLoading]);

  const handleOnCourseCard = (): void => {
    //add onPress
  };

  const handleRefresh = (): void => {
    handleCoursesLoad();
  };

  const handleLoadMoreCourses = (): void => {
    //add fetch
  };

  if (dataStatus === DataStatus.PENDING || isLoading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={({ id }): string => id.toString()}
        renderItem={({ item: course }): ReactElement => (
          <CourseCard course={course} onCoursePress={handleOnCourseCard} />
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
    </View>
  );
};

export { Courses };
