import React, { FC } from 'react';

import { DataStatus } from '~/common/enums/enums';
import { View } from '~/components/common/common';
import {
  useAppSelector,
  useCallback,
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
  const [isMentorCardShown, setIsMentorCardShown] = useState(
    !isMentorChoosingEnabled,
  );

  const areMentorsLoading = dataStatus === DataStatus.PENDING;

  const handleMentorCardShownToggle = (): void => {
    setIsMentorCardShown(!isMentorCardShown);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsMentorCardShown(!isMentorChoosingEnabled);
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      {isMentorCardShown ? (
        <MyMentorCard
          mentor={mentor}
          onChangeMentor={handleMentorCardShownToggle}
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
