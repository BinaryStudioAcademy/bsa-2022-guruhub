import React, { FC, ReactElement } from 'react';

import { AppColor, AppScreenName, DataStatus } from '~/common/enums/enums';
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

  const payload: CourseFilteringDto = {
    title: '',
    categoryKey: '',
  };

  const handleCoursesLoad = (): void => {
    dispatch(coursesActions.getCourses(payload));
  };

  const handleCourseCard = (): void => {
    //add onPress
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

  useEffect(() => {
    if (courseCategory) {
      payload.categoryKey = courseCategory.key;
    }

    if (searchValue) {
      payload.title = searchValue;
    }

    dispatch(coursesActions.getCourses(payload));
  }, [courseCategory, searchValue]);

  useFocusEffect(
    useCallback(() => {
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
      <CategoryList items={categories} />
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
