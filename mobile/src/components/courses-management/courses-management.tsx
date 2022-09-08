import React, { FC } from 'react';

import { DataStatus } from '~/common/enums/enums';
import { CourseGetResponseDto } from '~/common/types/types';
import {
  CategoryCell,
  Pagination,
  ScrollView,
  Spinner,
  View,
} from '~/components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useFocusEffect,
  usePagination,
} from '~/hooks/hooks';
import { coursesManagementActions } from '~/store/actions';

import { DEFAULT_PAGE_SIZE } from './common/constants/constants';
import { ActionCell } from './components/action-cell/action-cell';
import { CoursesManagementTable } from './courses-management-table/courses-management-table';
import { styles } from './styles';

const CoursesManagement: FC = () => {
  const { page, handlePageChange } = usePagination();
  const dispatch = useAppDispatch();
  const { dataStatus, coursesWithCategory, totalCoursesNumber } =
    useAppSelector((state) => state.coursesManagement);

  const handleEditCourse = (courseId: number): void => {
    // eslint-disable-next-line no-console
    console.log(courseId);
  };

  const coursesRows = coursesWithCategory.map((item: CourseGetResponseDto) => {
    return {
      title: item.title,
      category: item.category ? (
        <CategoryCell category={item.category} />
      ) : (
        'Unknown'
      ),
      action: (
        <ActionCell
          categoryId={item.courseCategoryId}
          onEdit={handleEditCourse}
        />
      ),
    };
  });

  useFocusEffect(
    useCallback(() => {
      dispatch(
        coursesManagementActions.getCoursesWithCategory({
          page,
          count: DEFAULT_PAGE_SIZE,
        }),
      );
    }, [page, totalCoursesNumber]),
  );

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner isOverflow />;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <CoursesManagementTable tableData={coursesRows} />
        <View style={styles.paginationContainer}>
          <Pagination
            totalCount={5}
            pageSize={DEFAULT_PAGE_SIZE}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export { CoursesManagement };
