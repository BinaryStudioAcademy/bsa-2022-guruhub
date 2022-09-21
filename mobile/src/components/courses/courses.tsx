import React, { FC, ReactElement, useRef } from 'react';

import {
  AppColor,
  AppScreenName,
  DataStatus,
  PaginationDefaultValue,
} from '~/common/enums/enums';
import {
  CourseFilteringWithPaginationDto,
  CourseGetRequestParamsDto,
} from '~/common/types/courses/courses';
import {
  FAB,
  FlatList,
  RefreshControl,
  Search,
  Text,
  View,
} from '~/components/common/common';
import { CourseCard } from '~/components/course-card/course-card';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useCallback,
  useEffect,
  useFocusEffect,
} from '~/hooks/hooks';
import { categoryActions, coursesActions } from '~/store/actions';

import { CategoryList } from './components/category-list/category-list';
import { styles } from './styles';

const Courses: FC = (): ReactElement => {
  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();

  const {
    user,
    courses,
    dataStatus,
    categories,
    courseCategory,
    categoryDataStatus,
    totalCoursesNumber,
  } = useAppSelector(({ courses, categories, auth }) => ({
    user: auth.user,
    courses: courses.courses,
    dataStatus: courses.dataStatus,
    totalCoursesNumber: courses.totalCoursesNumber,
    categories: categories.categories,
    courseCategory: categories.courseCategory,
    categoryDataStatus: categories.dataStatus,
  }));

  const isLoading =
    dataStatus === DataStatus.PENDING ||
    categoryDataStatus === DataStatus.PENDING;

  const filter = useRef<CourseFilteringWithPaginationDto>({
    title: '',
    categoryKey: '',
    page: PaginationDefaultValue.DEFAULT_PAGE,
    count: PaginationDefaultValue.DEFAULT_COUNT_BY_20,
  });

  const handleCoursesLoad = (): void => {
    dispatch(
      coursesActions.getCourses({
        title: filter.current.title ?? '',
        categoryKey: filter.current.categoryKey ?? '',
        page: filter.current.page,
        count: filter.current.count,
      }),
    );
  };

  const handleLoadMore = (): void => {
    const isExistMoreCourses = totalCoursesNumber > filter.current.count;

    if (isExistMoreCourses) {
      filter.current.count =
        filter.current.count + PaginationDefaultValue.DEFAULT_COUNT_BY_20;
      handleCoursesLoad();
    }
  };

  const handleCourseCard = (id: CourseGetRequestParamsDto): void => {
    dispatch(coursesActions.getCourse(id));
    navigation.navigate(AppScreenName.COURSE);
  };

  const handleRefresh = (): void => {
    handleCoursesLoad();
  };

  const handleAddCourse = (): void => {
    navigation.navigate(AppScreenName.ADD_COURSE);
  };

  const handleFilters = (search: string): void => {
    filter.current.title = search;
    filter.current.count = PaginationDefaultValue.DEFAULT_COUNT_BY_20;
    handleCoursesLoad();
  };

  const handleCategorySelect = (id: number): void => {
    if (id !== courseCategory?.id) {
      dispatch(categoryActions.getCategoryById({ id }));
    } else {
      dispatch(categoryActions.clearCategory());
    }
  };

  useEffect(() => {
    const activeCategoryKey = courseCategory?.key ?? '';

    if (filter.current.categoryKey !== activeCategoryKey) {
      filter.current.categoryKey = activeCategoryKey;
      handleFilters('');
    }
  }, [courseCategory?.key]);

  useFocusEffect(
    useCallback(() => {
      dispatch(categoryActions.getAllWithCourses());
      handleCoursesLoad();

      return () => {
        dispatch(categoryActions.clearCategory());
      };
    }, []),
  );

  return (
    <>
      <View style={styles.searchFieldContainer}>
        <Search onSearch={handleFilters} />
      </View>
      <CategoryList
        items={categories}
        handleSelect={handleCategorySelect}
        activeCategoryId={courseCategory?.id ?? null}
      />
      <View style={styles.container}>
        <FlatList
          data={courses}
          keyExtractor={({ id }, index): string => id.toString() + index}
          renderItem={({ item: course }): ReactElement => (
            <CourseCard course={course} onCoursePress={handleCourseCard} />
          )}
          refreshControl={
            <RefreshControl
              colors={[AppColor.BRAND.BLUE_100]}
              refreshing={isLoading}
              onRefresh={handleRefresh}
            />
          }
          onEndReachedThreshold={0.5}
          ListEmptyComponent={(): ReactElement => (
            <Text style={styles.noCourses}>No courses found</Text>
          )}
          onEndReached={handleLoadMore}
          refreshing={true}
        />
        {user && <FAB onPress={handleAddCourse} />}
      </View>
    </>
  );
};

export { Courses };
