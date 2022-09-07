import React, { FC } from 'react';

import { DataStatus } from '~/common/enums/enums';
import { CourseGetResponseDto } from '~/common/types/types';
import {
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
import { CoursesManagementTable } from './courses-management-table/courses-management-table';
import { styles } from './styles';

const CoursesManagement: FC = () => {
  const { page, handlePageChange } = usePagination();
  const dispatch = useAppDispatch();
  const { dataStatus, coursesWithCategory, totalCoursesNumber } =
    useAppSelector((state) => state.coursesManagement);

  const coursesRows = coursesWithCategory.map((item: CourseGetResponseDto) => {
    return {
      title: item.title,
      category: item.category?.name ?? 'Unknown',
      action: 'action',
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
