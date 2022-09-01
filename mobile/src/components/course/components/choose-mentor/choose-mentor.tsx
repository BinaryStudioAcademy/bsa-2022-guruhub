import React, { FC, ReactElement } from 'react';

import { AppColor, DataStatus } from '~/common/enums/enums';
import {
  FlatList,
  RefreshControl,
  Search,
  Spinner,
  Text,
  View,
} from '~/components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from '~/hooks/hooks';
import { coursesActions } from '~/store/actions';

import { MentorCard } from './components/components';
import { styles } from './styles';

const ChooseMentor: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useAppDispatch();
  const { mentors, dataStatus, course, isMentorChoosingEnabled } =
    useAppSelector(({ courses }) => ({
      mentors: courses.mentors,
      dataStatus: courses.dataStatus,
      course: courses.course,
      isMentorChoosingEnabled: courses.isMentorChoosingEnabled,
    }));

  const courseId = course?.id;
  const isMentorsLoading = dataStatus === DataStatus.PENDING;

  const handleChooseButton = (mentorId: number): void => {
    dispatch(coursesActions.chooseMentor({ id: mentorId }));
  };

  const handleSearch = (search: string): void => {
    setSearchValue(search);
  };

  const handleMentorsLoad = (): void => {
    if (courseId) {
      dispatch(
        coursesActions.getMentorsByCourseId({
          courseId: courseId,
          filteringOpts: { mentorName: searchValue },
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(coursesActions.updateisMentorChoosingEnabled());
    handleMentorsLoad();
  }, [courseId, searchValue]);

  if (!isMentorChoosingEnabled) {
    return (
      <Text style={styles.isMentorChoosingEnabled}>
        You already mentor on this course!
      </Text>
    );
  }

  return (
    <>
      <View style={styles.searchFieldContainer}>
        <Search onSearch={handleSearch} />
      </View>
      <View style={styles.container}>
        {isMentorsLoading ? (
          <View style={styles.spinnerContainer}>
            <Spinner isOverflow />
          </View>
        ) : (
          <FlatList
            data={mentors}
            keyExtractor={({ id }): string => id.toString()}
            renderItem={({ item: mentor }): ReactElement => (
              <MentorCard mentor={mentor} onPressChoose={handleChooseButton} />
            )}
            refreshControl={
              <RefreshControl
                colors={[AppColor.BRAND.BLUE_100]}
                refreshing={false}
                onRefresh={handleMentorsLoad}
              />
            }
            ListHeaderComponent={(): ReactElement => (
              <Text style={styles.title}>Choose a mentor</Text>
            )}
            ListEmptyComponent={(): ReactElement => (
              <Text style={styles.noMentors}>
                There are no mentors for current course yet
              </Text>
            )}
          />
        )}
      </View>
    </>
  );
};

export { ChooseMentor };
