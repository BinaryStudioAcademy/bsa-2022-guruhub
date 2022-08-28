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
import { CourseCard } from '~/components/courses/components/components';
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
  const [isLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();

  const { courses, dataStatus } = useAppSelector((state) => state.courses);
  const {
    categories,
    courseCategory,
    dataStatus: categoryDataStatus,
  } = useAppSelector((state) => state.categories);

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
    if (!courseCategory || courseCategory.id !== id) {
      dispatch(categoryActions.getCategoryById({ id }));
    } else {
      dispatch(categoryActions.clearCategory());
    }
  };

  useEffect(() => {
    filter.current.categoryKey = courseCategory?.key || '';
    filter.current.title = searchValue;

    dispatch(coursesActions.getCourses(filter.current));
  }, [courseCategory, searchValue]);

  useFocusEffect(
    useCallback(() => {
      dispatch(categoryActions.clearCategory());
      dispatch(categoryActions.getCategories());
      handleCoursesLoad();
    }, []),
  );

  if (categoryDataStatus === DataStatus.PENDING) {
    return <Spinner isOverflow />;
  }

  return (
    <>
      <View style={styles.searchFieldContainer}>
        <Search onSearch={handleSearch} />
      </View>
      <CategoryList
        items={categories}
        handleSelect={handleCategorySelect}
        activeCategoryId={courseCategory?.id}
      />
      <View style={styles.container}>
        {dataStatus === DataStatus.PENDING ? (
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
                refreshing={isLoading}
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

        <FAB onPress={handleAddCourse} />
      </View>
    </>
  );
};

export { Courses };
