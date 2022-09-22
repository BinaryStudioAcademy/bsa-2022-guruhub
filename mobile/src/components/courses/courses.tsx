import React, { FC, ReactElement, useRef } from 'react';

import { AppColor, AppScreenName, DataStatus } from '~/common/enums/enums';
import { CourseGetRequestParamsDto } from '~/common/types/courses/courses';
import { CourseFilteringDto } from '~/common/types/types';
import {
  FAB,
  FlatList,
  RefreshControl,
  Search,
  Spinner,
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
  useState,
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
  } = useAppSelector(({ courses, categories, auth }) => ({
    user: auth.user,
    courses: courses.courses,
    dataStatus: courses.dataStatus,
    categories: categories.categories,
    courseCategory: categories.courseCategory,
    categoryDataStatus: categories.dataStatus,
  }));
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  const isLoading =
    dataStatus === DataStatus.PENDING ||
    categoryDataStatus === DataStatus.PENDING;

  const filter = useRef<CourseFilteringDto>({
    title: '',
    categoryKey: '',
  });

  const handleCoursesLoad = (): void => {
    dispatch(coursesActions.getCourses(filter.current));
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

  const handleSearch = (search: string): void => {
    filter.current.title = search;

    handleCoursesLoad();
  };

  const handleCategorySelect = (id: number): void => {
    if (id !== courseCategory?.id) {
      dispatch(categoryActions.getCategoryById({ id }));
    } else {
      dispatch(categoryActions.clearCategory());
    }
  };

  const handleCategorySelectUnauthorized = (id: number): void => {
    const selectedId = id === selectedCategoryId ? null : id;

    setSelectedCategoryId(selectedId);
  };

  const handleCategorySelectMethod = user
    ? handleCategorySelect
    : handleCategorySelectUnauthorized;

  useEffect(() => {
    const activeCategoryKeyUnauthorized =
      categories.find((category) => category.id === selectedCategoryId)?.key ??
      '';
    const activeCategoryKey = user
      ? courseCategory?.key ?? ''
      : activeCategoryKeyUnauthorized;

    if (filter.current.categoryKey !== activeCategoryKey) {
      filter.current.categoryKey = activeCategoryKey;

      handleCoursesLoad();
    }
  }, [courseCategory?.key, user, selectedCategoryId]);

  useFocusEffect(
    useCallback(() => {
      dispatch(categoryActions.getAllWithCourses());
      handleCoursesLoad();

      return () => {
        dispatch(categoryActions.clearCategory());
        setSelectedCategoryId(null);
      };
    }, []),
  );

  return (
    <>
      <View style={styles.searchFieldContainer}>
        <Search onSearch={handleSearch} />
      </View>
      <CategoryList
        items={categories}
        handleSelect={handleCategorySelectMethod}
        activeCategoryId={courseCategory?.id ?? selectedCategoryId}
      />
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.spinnerContainer}>
            <Spinner isOverflow />
          </View>
        ) : (
          <FlatList
            data={courses}
            keyExtractor={({ id }): string => id.toString()}
            renderItem={({ item: course }): ReactElement => (
              <CourseCard course={course} onCoursePress={handleCourseCard} />
            )}
            refreshControl={
              <RefreshControl
                colors={[AppColor.BRAND.BLUE_100]}
                refreshing={false}
                onRefresh={handleRefresh}
              />
            }
            onEndReachedThreshold={0.1}
            ListEmptyComponent={(): ReactElement => (
              <Text style={styles.noCourses}>No courses found</Text>
            )}
          />
        )}

        {user && <FAB onPress={handleAddCourse} />}
      </View>
    </>
  );
};

export { Courses };
