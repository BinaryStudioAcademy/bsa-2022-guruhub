import React, { FC, ReactElement } from 'react';

import { AppScreenName, DataStatus } from '~/common/enums/enums';
import { CourseGetRequestParamsDto } from '~/common/types/types';
import { FlatList, Spinner, Text, View } from '~/components/common/common';
import { CourseCard } from '~/components/course-card/course-card';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useEffect,
} from '~/hooks/hooks';
import { coursesActions, myCoursesActions } from '~/store/actions';

import { styles } from './styles';

const CoursesAsStudent: FC = () => {
  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();

  const { courses, dataStatus } = useAppSelector(({ myCourses }) => ({
    courses: myCourses.coursesStudying,
    dataStatus: myCourses.dataStatus,
  }));

  const isLoading = dataStatus === DataStatus.PENDING;

  const handleCourseCard = (id: CourseGetRequestParamsDto): void => {
    dispatch(coursesActions.getCourse(id));
    navigation.navigate(AppScreenName.COURSE);
  };

  useEffect(() => {
    dispatch(myCoursesActions.getCoursesStudying());
  }, [dispatch]);

  if (isLoading) {
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
        ListEmptyComponent={(): ReactElement => (
          <Text style={styles.noCourses}>No courses found</Text>
        )}
      />
    </View>
  );
};

export { CoursesAsStudent };
