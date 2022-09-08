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
    dispatch(
      myCoursesActions.getCoursesMentoring({
        page,
        count: PaginationDefaultValue.DEFAULT_COUNT,
      }),
    );
  }, [dispatch]);

  // const [activeCourse, setActiveCourse] =
  //   useState<CourseGetMentoringDto | null>(null);

  useEffect(() => {
    dispatch(
      myCoursesActions.getCoursesMentoring({
        page,
        count: PaginationDefaultValue.DEFAULT_COUNT,
      }),
    );
  }, [page]);

  const handleEdit = (course: CourseUpdateMentoringDto): void => {
    // eslint-disable-next-line no-console
    console.log('course my-courses');
    // eslint-disable-next-line no-console
    console.log(course);
  };

  const columns = useMemo<Column<CoursesMentoringTableRow>[]>(() => {
    return getCoursesMentoringColumns(handleEdit);
  }, []);

  const data: CoursesMentoringTableRow[] =
    getCoursesMentoringRows(coursesMentoring);

  return (
    <div className={styles.myCourses}>
      {dataStatus === DataStatus.PENDING ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.header}>
            <h1 className={styles.headingText}>My courses (as student)</h1>
          </div>
          <CoursesList courses={coursesStudying} />
          <div className={styles.header}>
            <h1 className={styles.headingText}>My courses (as mentor)</h1>
          </div>
          <Table
            data={data}
            columns={columns}
            currentPage={page}
            onPageChange={handlePageChange}
            pageSize={PaginationDefaultValue.DEFAULT_COUNT}
            totalCount={totalCoursesMentoring}
          />
        </>
      )}
    </div>
  );
};

export { MyCourses };
