import React, { FC, ReactElement } from 'react';

import { AppColor } from '~/common/enums/enums';
import {
  CourseGetResponseDto,
  UserDetailsResponseDto,
  UsersGetResponseDto,
} from '~/common/types/types';
import {
  FlatList,
  RefreshControl,
  Search,
  Spinner,
  Text,
  View,
} from '~/components/common/common';
import { useAppDispatch, useEffect, useState } from '~/hooks/hooks';
import { coursesActions } from '~/store/actions';

import { MentorCard } from './components/components';
import { styles } from './styles';

type Props = {
  mentors: UserDetailsResponseDto[];
  course: CourseGetResponseDto | null;
  mentor: UsersGetResponseDto | null;
  isLoading: boolean;
  onChangeMentor: () => void;
};

const ChooseMentor: FC<Props> = ({
  mentors,
  course,
  isLoading,
  mentor,
  onChangeMentor,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useAppDispatch();
  const courseId = course?.id;

  const handleChooseButton = (mentorId: number): void => {
    if (mentor) {
      dispatch(coursesActions.changeMentor({ id: mentorId }));
      onChangeMentor();

      return;
    }
    dispatch(coursesActions.chooseMentor({ id: mentorId }));
  };

  const handleSearch = (search: string): void => {
    setSearchValue(search);
  };

  const handleMentorsLoad = (): void => {
    if (courseId) {
      dispatch(coursesActions.updateIsMentorChoosingEnabled(courseId));
      dispatch(
        coursesActions.getMentorsByCourseId({
          courseId: courseId,
          filteringOpts: { mentorName: searchValue },
        }),
      );
    }
  };

  useEffect(() => {
    handleMentorsLoad();
  }, [courseId, searchValue]);

  return (
    <>
      <View style={styles.searchFieldContainer}>
        <Search onSearch={handleSearch} />
      </View>
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.spinnerContainer}>
            <Spinner isOverflow />
          </View>
        ) : (
          <FlatList
            data={mentors}
            keyExtractor={({ id }): string => id.toString()}
            renderItem={({ item: mentor }): ReactElement => (
              <MentorCard mentor={mentor} onChoose={handleChooseButton} />
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
