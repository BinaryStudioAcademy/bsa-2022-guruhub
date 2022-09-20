import { DataStatus, PaginationDefaultValue } from 'common/enums/enums';
import { CourseUpdateMentoringDto, FC } from 'common/types/types';
import { CoursesList, Spinner, Table } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useMemo,
  usePagination,
} from 'hooks/hooks';
import { Column } from 'react-table';
import { myCoursesActions } from 'store/actions';

import { CoursesMentoringTableRow } from './common/types/types';
import {
  getCoursesMentoringColumns,
  getCoursesMentoringRows,
} from './helpers/helpers';
import styles from './styles.module.scss';

const MyCourses: FC = () => {
  const { page: mentorCoursesPage, handlePageChange: handleMentorCoursesPage } =
    usePagination({
      queryName: 'mentorCoursesPage',
    });

  const {
    page: studentCoursesPage,
    handlePageChange: handleStudentCoursesPage,
  } = usePagination({
    queryName: 'studentCoursesPage',
  });

  const dispatch = useAppDispatch();
  const {
    coursesStudying,
    coursesMentoring,
    totalCoursesMentoring,
    totalCoursesStudying,
    dataStatus,
  } = useAppSelector((state) => ({
    coursesStudying: state.myCourses.coursesStudying,
    coursesMentoring: state.myCourses.coursesMentoring,
    dataStatus: state.myCourses.dataStatus,
    totalCoursesMentoring: state.myCourses.totalCoursesMentoring,
    totalCoursesStudying: state.myCourses.totalCoursesStudying,
  }));

  useEffect(() => {
    dispatch(
      myCoursesActions.getCoursesMentoring({
        page: mentorCoursesPage,
        count: PaginationDefaultValue.DEFAULT_COUNT,
      }),
    );
  }, [mentorCoursesPage]);

  useEffect(() => {
    dispatch(
      myCoursesActions.getCoursesStudying({
        page: studentCoursesPage,
        count: PaginationDefaultValue.DEFAULT_COUNT_BY_8,
      }),
    );
  }, [studentCoursesPage]);

  const handleEdit = (course: CourseUpdateMentoringDto): void => {
    dispatch(myCoursesActions.updateCoursesMentoring(course));
  };

  const columns = useMemo<Column<CoursesMentoringTableRow>[]>(() => {
    return getCoursesMentoringColumns(handleEdit);
  }, []);

  const data = useMemo<CoursesMentoringTableRow[]>(() => {
    return getCoursesMentoringRows(coursesMentoring);
  }, [coursesMentoring]);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  return (
    <div className={styles.myCourses}>
      <h1 className={styles.header}>My courses (as student)</h1>
      <CoursesList
        courses={coursesStudying}
        currentPage={studentCoursesPage}
        onPageChange={handleStudentCoursesPage}
        pageSize={PaginationDefaultValue.DEFAULT_COUNT_BY_8}
        totalCount={totalCoursesStudying}
      />
      <h1 className={styles.header}>My courses (as mentor)</h1>
      <div className={styles.mentorCourses}>
        <Table
          data={data}
          columns={columns}
          currentPage={mentorCoursesPage}
          onPageChange={handleMentorCoursesPage}
          pageSize={PaginationDefaultValue.DEFAULT_COUNT}
          totalCount={totalCoursesMentoring}
        />
      </div>
    </div>
  );
};

export { MyCourses };
