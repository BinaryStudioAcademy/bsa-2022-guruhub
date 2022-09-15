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
import {
  ActionCell,
  CoursesManagementTitle,
  TitleCell,
} from './components/components';
import { CoursesManagementTable } from './courses-management-table/courses-management-table';
import { styles } from './styles';

const CoursesManagement: FC = () => {
  const { page, handlePageChange } = usePagination();
  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();
  const { dataStatus, courses, totalCoursesNumber } = useAppSelector(
    (state) => state.coursesManagement,
  );

  const handleEditPress = (courseId: number): void => {
    dispatch(coursesActions.getCourse({ id: courseId }));
    navigation.navigate(AppScreenName.EDIT_COURSE);
  };

  const handleTitlePress = (item: CourseGetResponseDto): void => {
    dispatch(coursesActions.getCourse(item));
    navigation.navigate(AppScreenName.COURSE);
  };

  navigation.setOptions({
    title: <CoursesManagementTitle />,
  });

  const coursesRows = courses.map((item: CourseGetResponseDto) => {
    return {
      title: (
        <TitleCell
          title={item.title}
          onPress={(): void => handleTitlePress(item)}
        />
      ),
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
