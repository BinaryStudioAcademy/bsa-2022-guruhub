import React, { FC, ReactElement, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { Course } from '~/common/types/courses/courses';
import { useAppDispatch } from '~/hooks/hooks';
import { loadCourses } from '~/store/courses/actions';

import { CourseCard } from './components/components';
import { styles } from './styles';

const Courses: FC = (): ReactElement => {
  const dispatch = useAppDispatch();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    dispatch(loadCourses({})).then(({ payload }) => {
      setCourses(payload as Course[]);
    });
  }, [dispatch]);

  const handleOnCourseCard = (): void => {
    // TODO add
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={({ id }): string => id}
        renderItem={({ item: course }): ReactElement => (
          <CourseCard course={course} onCoursePress={handleOnCourseCard} />
        )}
      />
    </View>
  );
};

export { Courses };
