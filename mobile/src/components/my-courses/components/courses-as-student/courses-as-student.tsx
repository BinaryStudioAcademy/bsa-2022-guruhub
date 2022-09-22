import React, { FC, ReactElement, useRef } from 'react';

import {
  AppScreenName,
  DataStatus,
  PaginationDefaultValue,
} from '~/common/enums/enums';
import {
  CourseGetRequestParamsDto,
  EntityPaginationRequestQueryDto,
} from '~/common/types/types';
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

  const { courses, dataStatus, totalCoursesStudying } = useAppSelector(
    ({ myCourses }) => ({
      courses: myCourses.coursesStudying,
      dataStatus: myCourses.dataStatus,
      totalCoursesStudying: myCourses.totalCoursesStudying,
    }),
  );

  const filter = useRef<EntityPaginationRequestQueryDto>({
    page: PaginationDefaultValue.DEFAULT_PAGE,
    count: PaginationDefaultValue.DEFAULT_COUNT_BY_20,
  });

  const isLoading = dataStatus === DataStatus.PENDING;

  const handleCoursesLoad = (): void => {
    dispatch(
      myCoursesActions.getCoursesStudying({
        page: filter.current.page,
        count: filter.current.count,
      }),
    );
  };

  const handleCourseCard = (id: CourseGetRequestParamsDto): void => {
    dispatch(coursesActions.getCourse(id));
    navigation.navigate(AppScreenName.COURSE);
  };

  const handleLoadMore = (): void => {
    const isExistMoreCourses = totalCoursesStudying > filter.current.count;

    if (isExistMoreCourses) {
      filter.current.count += PaginationDefaultValue.DEFAULT_COUNT_BY_20;
      handleCoursesLoad();
    }
  };

  useEffect(() => {
    handleCoursesLoad();
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
        onEndReached={handleLoadMore}
      />
    </View>
  );
};

export { CoursesAsStudent };
