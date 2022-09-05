import { PaginationDefaultValue } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Table } from 'components/common/common';
import { EditCategoryModal } from 'components/course/components/components';
import { CoursesManagementTableRow } from 'components/courses-management/common/types/types';
import {
  getCoursesManagementColumns,
  getCoursesManagementRows,
} from 'components/courses-management/helpers/helpers';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useMemo,
  usePagination,
  useState,
} from 'hooks/hooks';
import { Column } from 'react-table';
import { coursesManagementActions } from 'store/actions';

import styles from './styles.module.scss';

const CoursesManagementTable: FC = () => {
  const { page, handlePageChange } = usePagination({
    queryName: 'courseCategoriesPage',
  });
  const dispatch = useAppDispatch();
  const { categories, courses, totalCoursesNumber } = useAppSelector(
    ({ coursesManagement }) => ({
      categories: coursesManagement.categories,
      courses: coursesManagement.courses,
      totalCoursesNumber: coursesManagement.totalCoursesNumber,
    }),
  );

  const [isUpdateCategoryModalOpen, setUpdateCategoryModalOpen] =
    useState<boolean>(false);
  const [activeCourse, setActiveCourse] =
    useState<CoursesManagementTableRow | null>(null);

  const handleUpdateCategoryModalToggle = (): void => {
    if (isUpdateCategoryModalOpen) {
      setActiveCourse(null);
    }
    setUpdateCategoryModalOpen((prev) => !prev);
  };

  useEffect(() => {
    dispatch(
      coursesManagementActions.getCourses({
        page,
        count: PaginationDefaultValue.DEFAULT_COURSE_CATEGORIES_COUNT,
      }),
    );
    dispatch(coursesManagementActions.getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      coursesManagementActions.getCourses({
        page,
        count: PaginationDefaultValue.DEFAULT_COURSE_CATEGORIES_COUNT,
      }),
    );
  }, [page]);

  const handleEdit = (course: CoursesManagementTableRow): void => {
    setActiveCourse(course);
    handleUpdateCategoryModalToggle();
  };
  const columns = useMemo<Column<CoursesManagementTableRow>[]>(() => {
    return getCoursesManagementColumns(handleEdit);
  }, []);

  const data: CoursesManagementTableRow[] = getCoursesManagementRows(courses);

  return (
    <div className={styles.table}>
      <Table
        data={data}
        columns={columns}
        currentPage={page}
        onPageChange={handlePageChange}
        pageSize={PaginationDefaultValue.DEFAULT_COURSE_CATEGORIES_COUNT}
        totalCount={totalCoursesNumber}
      />
      {activeCourse && (
        <EditCategoryModal
          courseId={activeCourse.id}
          defaultCategoryId={activeCourse.category?.id}
          isOpen={isUpdateCategoryModalOpen}
          categories={categories}
          onModalToggle={handleUpdateCategoryModalToggle}
        />
      )}
    </div>
  );
};

export { CoursesManagementTable };
