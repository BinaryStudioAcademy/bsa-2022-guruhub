import React, { FC, ReactElement, useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import { AppColor } from '~/common/enums/enums';
import { CoursesGetAllResponseDto } from '~/common/types/courses/courses';
import { useAppDispatch } from '~/hooks/hooks';
import { loadCourses } from '~/store/courses/actions';

import { Spinner } from '../common/common';
import { CourseCard } from './components/components';
import { styles } from './styles';

const Courses: FC = (): ReactElement => {
  const dispatch = useAppDispatch();
  const [courses, setCourses] = useState<CoursesGetAllResponseDto | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCoursesLoad = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const data = await dispatch(loadCourses({}));
      setCourses(data.payload as CoursesGetAllResponseDto);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleCoursesLoad();
  }, [dispatch, setIsLoading]);

  const handleOnCourseCard = (): void => {
    //TODO add onPress
  };

  const handleRefresh = (): void => {
    handleCoursesLoad();
  };

  const handleLoadMorePosts = (): void => {
    //TODO add fetch
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Spinner />
      ) : (
        <FlatList
          data={courses}
          keyExtractor={({ id }): string => id}
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
          onEndReached={handleLoadMorePosts}
          onEndReachedThreshold={0.1}
        />
      )}
    </View>
  );
};

export { Courses };
