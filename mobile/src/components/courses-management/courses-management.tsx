import React, { FC } from 'react';

import { AppScreenName, DataStatus } from '~/common/enums/enums';
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
  useAppNavigate,
  useAppSelector,
  useCallback,
  useFocusEffect,
  usePagination,
} from '~/hooks/hooks';
import { coursesActions, coursesManagementActions } from '~/store/actions';

import { DEFAULT_PAGE_SIZE } from './common/constants/constants';
import { ActionCell } from './components/action-cell/action-cell';
import { CoursesManagementTable } from './courses-management-table/courses-management-table';
import { styles } from './styles';

const CoursesManagement: FC = () => {
  const { page, handlePageChange } = usePagination();
  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();
  const { dataStatus, coursesWithCategory, totalCoursesNumber } =
    useAppSelector((state) => state.coursesManagement);

  const handleEditPress = (courseId: number): void => {
    dispatch(coursesManagementActions.setNavigateFromCoursesManagement());
    dispatch(coursesActions.getCourse({ id: courseId }));
    navigation.navigate(AppScreenName.EDIT_COURSE);
  };

  const coursesRows = coursesWithCategory.map((item: CourseGetResponseDto) => {
    return {
      title: item.title,
      category: <CategoryCell category={item.category} />,
      action: <ActionCell onEdit={(): void => handleEditPress(item.id)} />,
    };
  });

  useFocusEffect(
    useCallback(() => {
      dispatch(
        coursesManagementActions.getAllWithCategories({
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
