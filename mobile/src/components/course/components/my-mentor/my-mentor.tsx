import React, { FC } from 'react';

import { DataStatus } from '~/common/enums/enums';
import { Text, View } from '~/components/common/common';
import {
  useAppSelector,
  useCallback,
  useEffect,
  useFocusEffect,
  useState,
} from '~/hooks/hooks';

import { ChooseMentor, MyMentorCard } from './components/components';
import { styles } from './styles';

const MyMentor: FC = () => {
  const { mentor, mentors, dataStatus, course, isMentorChoosingEnabled } =
    useAppSelector(({ courses }) => ({
      mentor: courses.mentor,
      course: courses.course,
      mentors: courses.mentors,
      dataStatus: courses.dataStatus,
      isMentorChoosingEnabled: courses.isMentorChoosingEnabled,
    }));
  const [isMentorCardShown, setIsMentorCardShown] = useState<boolean>();

  const areMentorsLoading = dataStatus === DataStatus.PENDING;

  const handleMentorCardShown = (): void => {
    setIsMentorCardShown(!isMentorCardShown);
  };

  useEffect(() => {
    setIsMentorCardShown(Boolean(mentor));
  }, [mentor]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsMentorCardShown(false);
      };
    }, []),
  );

  if (!isMentorChoosingEnabled) {
    return (
      <Text style={styles.isMentorChoosingEnabled}>
        You already mentor on this course!
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      {isMentorCardShown ? (
        <MyMentorCard
          mentor={mentor}
          handleMentorCardShown={handleMentorCardShown}
        />
      ) : (
        <ChooseMentor
          course={course}
          mentors={mentors}
          isLoading={areMentorsLoading}
        />
      )}
    </View>
  );
};

export { MyMentor };
