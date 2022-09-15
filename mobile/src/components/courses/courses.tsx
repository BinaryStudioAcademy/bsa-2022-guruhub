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
  const [searchValue, setSearchValue] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

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

  const handleLoadMoreCourses = (): void => {
    //add fetch
  };

  const handleAddCourse = (): void => {
    navigation.navigate(AppScreenName.ADD_COURSE);
  };

  const handleSearch = (search: string): void => {
    setSearchValue(search);
  };

  const handleCategorySelect = (id: number): void => {
    const newActiveCategoryId = activeCategoryId !== id ? id : null;

    setActiveCategoryId(newActiveCategoryId);
  };

  useEffect(() => {
    if (activeCategoryId) {
      dispatch(categoryActions.getCategoryById({ id: activeCategoryId }));
    } else {
      dispatch(categoryActions.clearCategory());
    }
  }, [activeCategoryId]);

  useEffect(() => {
    filter.current.categoryKey = courseCategory?.key ?? '';
    filter.current.title = searchValue;

    dispatch(coursesActions.getCourses(filter.current));
  }, [courseCategory, searchValue]);

  useFocusEffect(
    useCallback(() => {
      dispatch(categoryActions.clearCategory());
      dispatch(categoryActions.getAllWithCourses());
      handleCoursesLoad();
      setActiveCategoryId(null);
    }, []),
  );

  return (
    <>
      <View style={styles.searchFieldContainer}>
        <Search onSearch={handleSearch} />
      </View>
      <CategoryList
        items={categories}
        handleSelect={handleCategorySelect}
        activeCategoryId={activeCategoryId}
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
            onEndReached={handleLoadMoreCourses}
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
