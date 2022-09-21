import React, { FC } from 'react';

import { CourseScreenName, DataStatus } from '~/common/enums/enums';
import {
  CourseGetMentoringDto,
  CourseGetRequestParamsDto,
} from '~/common/types/types';
import { Pagination, ScrollView, View } from '~/components/common/common';
import { DEFAULT_PAGE_SIZE } from '~/components/my-courses/common/constants/constants';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useCallback,
  useFocusEffect,
  usePagination,
} from '~/hooks/hooks';
import { coursesActions, myCoursesActions } from '~/store/actions';

import {
  MyCoursesTable,
  StudentsCountCell,
  TitleCell,
} from './components/components';
import { styles } from './styles';

const CoursesAsMentor: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigate();

  const { courses, dataStatus, totalCoursesMentoring } = useAppSelector(
    ({ myCourses }) => ({
      courses: myCourses.coursesMentoring,
      dataStatus: myCourses.dataStatus,
      totalCoursesMentoring: myCourses.totalCoursesMentoring,
    }),
  );
  const { page, handlePageChange } = usePagination();

  const isLoading = dataStatus === DataStatus.PENDING;

  const myCoursesRows = courses.map((item: CourseGetMentoringDto) => {
    return {
      title: (
        <TitleCell
          title={item.title}
          onCourseSelect={(): void => handleCourseCard({ id: item.id })}
        />
      ),
      studentsCount: (
        <StudentsCountCell
          courseId={item.id}
          studentsCount={item.studentsCount}
        />
      ),
    };
  });

  const handleCourseCard = (id: CourseGetRequestParamsDto): void => {
    dispatch(coursesActions.getCourse(id));
    navigation.navigate(CourseScreenName.COURSE);
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(
        myCoursesActions.getCoursesMentoring({
          page,
          count: DEFAULT_PAGE_SIZE,
        }),
      );
    }, [page, totalCoursesMentoring]),
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <MyCoursesTable tableData={myCoursesRows} isLoading={isLoading} />
        <View style={styles.paginationContainer}>
          <Pagination
            totalCount={totalCoursesMentoring}
            pageSize={DEFAULT_PAGE_SIZE}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export { CoursesAsMentor };
