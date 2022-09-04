import { PaginationDefaultValue } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Table } from 'components/common/common';
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

import { EditCategoryModal } from '../../../course/components/edit-category-modal/edit-category-modal';
import { CourseCategoriesTableRow } from '../../common/types/course-categories-table-row.type';
import {
  getCourseCategoriesColumns,
  getCourseCategoriesRows,
} from '../../helpers/helpers';
import styles from './styles.module.scss';

const CourseCategoriesTable: FC = () => {
  const { page, handlePageChange } = usePagination({
    queryName: 'interviewsPage',
  });
  const dispatch = useAppDispatch();
  const { categories, courses, totalCoursesNumber } = useAppSelector(
    ({ courseCategories, course }) => ({
      categories: course.categories,
      courses: courseCategories.courses,
      totalCoursesNumber: courseCategories.totalCoursesNumber,
    }),
  );

  const [isUpdateCategoryModalOpen, setUpdateCategoryModalOpen] =
    useState<boolean>(false);
  const [activeCourse, setActiveCourse] = useState<CourseCategoriesTableRow>();

  const handleUpdateCategoryModalToggle = (): void => {
    setUpdateCategoryModalOpen((prev) => !prev);
  };

  useEffect(() => {
    dispatch(
      courseCategoriesActions.getCourseCategories({
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
