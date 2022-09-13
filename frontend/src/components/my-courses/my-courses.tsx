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
  const { page, handlePageChange } = usePagination({
    queryName: 'myCoursesPage',
  });

  const dispatch = useAppDispatch();
  const {
    coursesStudying,
    coursesMentoring,
    totalCoursesMentoring,
    dataStatus,
  } = useAppSelector((state) => ({
    coursesStudying: state.myCourses.coursesStudying,
    coursesMentoring: state.myCourses.coursesMentoring,
    dataStatus: state.myCourses.dataStatus,
    totalCoursesMentoring: state.myCourses.totalCoursesMentoring,
  }));

  useEffect(() => {
    dispatch(myCoursesActions.getCoursesStudying());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      myCoursesActions.getCoursesMentoring({
        page,
        count: PaginationDefaultValue.DEFAULT_COUNT,
      }),
    );
  }, [page]);

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
      <CoursesList courses={coursesStudying} />
      <h1 className={styles.header}>My courses (as mentor)</h1>
      <Table
        data={data}
        columns={columns}
        currentPage={page}
        onPageChange={handlePageChange}
        pageSize={PaginationDefaultValue.DEFAULT_COUNT}
        totalCount={totalCoursesMentoring}
      />
    </div>
  );
};

export { MyCourses };
