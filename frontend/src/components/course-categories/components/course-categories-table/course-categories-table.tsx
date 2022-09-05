import { PaginationDefaultValue } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Table } from 'components/common/common';
import { EditCategoryModal } from 'components/course/components/components';
import { CourseCategoriesTableRow } from 'components/course-categories/common/types/types';
import {
  getCourseCategoriesColumns,
  getCourseCategoriesRows,
} from 'components/course-categories/helpers/helpers';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useMemo,
  usePagination,
  useState,
} from 'hooks/hooks';
import { Column } from 'react-table';
import { courseCategoriesActions } from 'store/actions';

import styles from './styles.module.scss';

const CourseCategoriesTable: FC = () => {
  const { page, handlePageChange } = usePagination({
    queryName: 'courseCategoriesPage',
  });
  const dispatch = useAppDispatch();
  const { categories, courses, totalCoursesNumber } = useAppSelector(
    ({ courseCategories }) => ({
      categories: courseCategories.categories,
      courses: courseCategories.courses,
      totalCoursesNumber: courseCategories.totalCoursesNumber,
    }),
  );

  const [isUpdateCategoryModalOpen, setUpdateCategoryModalOpen] =
    useState<boolean>(false);
  const [activeCourse, setActiveCourse] =
    useState<CourseCategoriesTableRow | null>(null);

  const handleUpdateCategoryModalToggle = (): void => {
    if (isUpdateCategoryModalOpen) {
      setActiveCourse(null);
    }
    setUpdateCategoryModalOpen((prev) => !prev);
  };

  useEffect(() => {
    dispatch(
      courseCategoriesActions.getCourses({
        page,
        count: PaginationDefaultValue.DEFAULT_COURSE_CATEGORIES_COUNT,
      }),
    );
    dispatch(courseCategoriesActions.getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      courseCategoriesActions.getCourses({
        page,
        count: PaginationDefaultValue.DEFAULT_COURSE_CATEGORIES_COUNT,
      }),
    );
  }, [page]);

  const handleEdit = (course: CourseCategoriesTableRow): void => {
    setActiveCourse(course);
    handleUpdateCategoryModalToggle();
  };
  const columns = useMemo<Column<CourseCategoriesTableRow>[]>(() => {
    return getCourseCategoriesColumns(handleEdit);
  }, []);

  const data: CourseCategoriesTableRow[] = getCourseCategoriesRows(courses);

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

export { CourseCategoriesTable };
