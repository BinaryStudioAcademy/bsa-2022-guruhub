import React, { FC, ReactElement } from 'react';

import { AppColor, AppScreenName, DataStatus } from '~/common/enums/enums';
import {
  FAB,
  FlatList,
  RefreshControl,
  Search,
  Spinner,
  View,
} from '~/components/common/common';
import { CourseCard } from '~/components/courses/components/components';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useCallback,
  useFocusEffect,
  useState,
} from '~/hooks/hooks';
import { coursesActions } from '~/store/actions';

import { styles } from './styles';

const Courses: FC = (): ReactElement => {
  const [isLoading] = useState(false);
  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();
  const { courses, dataStatus } = useAppSelector((state) => state.courses);

  const handleCoursesLoad = (): void => {
    dispatch(coursesActions.getCourses({ title: '', categoryKey: '' }));
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
    dispatch(coursesActions.getCourses({ title: search, categoryKey: '' }));
  };

  useFocusEffect(
    useCallback(() => {
      handleCoursesLoad();
    }, []),
  );

  return (
    <>
      <View style={styles.searchFieldContainer}>
        <Search onSearch={handleSearch} />
      </View>
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
          />
        )}

        <FAB onPress={handleAddCourse} />
      </View>
    </>
  );
};

export { Courses };
