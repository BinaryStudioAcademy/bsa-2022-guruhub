import React, { FC, ReactElement } from 'react';

import { AppColor, ButtonVariant } from '~/common/enums/enums';
import {
  CourseGetResponseDto,
  UsersGetResponseDto,
} from '~/common/types/types';
import {
  Button,
  FlatList,
  RefreshControl,
  Search,
  Spinner,
  Text,
  View,
} from '~/components/common/common';
import { useAppDispatch, useEffect, useState } from '~/hooks/hooks';
import { coursesActions } from '~/store/actions';

import { MentorCard } from '../components';
import { styles } from './styles';

type Props = {
  mentors: UsersGetResponseDto[];
  course: CourseGetResponseDto | null;
  isLoading: boolean;
  onChangeMentor: (mentorId: number) => void;
  currentMentor: UsersGetResponseDto | null;
  onCancel: () => void;
};

const ChooseMentor: FC<Props> = ({
  mentors,
  course,
  isLoading,
  onChangeMentor,
  currentMentor,
  onCancel,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useAppDispatch();
  const courseId = course?.id;

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

  const hasMentors = Boolean(mentors.length);

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
              <MentorCard
                mentor={mentor.userDetails}
                onChoose={onChangeMentor}
              />
            )}
            refreshControl={
              <RefreshControl
                colors={[AppColor.BRAND.BLUE_100]}
                refreshing={false}
                onRefresh={handleMentorsLoad}
              />
            }
            ListHeaderComponent={(): ReactElement => (
              <View style={styles.listHeader}>
                <Text style={styles.title}>
                  {hasMentors ? 'Choose a mentor' : ''}
                </Text>
                {currentMentor && (
                  <View style={styles.cancelButton}>
                    <Button
                      label="Cancel"
                      size="small"
                      variant={ButtonVariant.CANCEL}
                      onPress={onCancel}
                    />
                  </View>
                )}
              </View>
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
