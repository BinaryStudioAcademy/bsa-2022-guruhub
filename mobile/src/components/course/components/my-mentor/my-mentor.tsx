import React, { FC } from 'react';

import { DataStatus } from '~/common/enums/enums';
import { View } from '~/components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useFocusEffect,
  useState,
} from '~/hooks/hooks';
import { coursesActions } from '~/store/actions';

import { ChooseMentor, MentorCard } from './components/components';
import { styles } from './styles';

const MyMentor: FC = () => {
  const dispatch = useAppDispatch();
  const { mentor, mentors, dataStatus, course, isMentorChoosingEnabled } =
    useAppSelector(({ courses }) => ({
      mentor: courses.mentor,
      course: courses.course,
      mentors: courses.mentors,
      dataStatus: courses.dataStatus,
      isMentorChoosingEnabled: courses.isMentorChoosingEnabled,
    }));
  const [isMentorCardShown, setIsMentorCardShown] = useState<boolean>(false);

  const areMentorsLoading = dataStatus === DataStatus.PENDING;

  const handleMentorCardShownToggle = (): void => {
    setIsMentorCardShown(!isMentorCardShown);
  };

  const handleChooseMentor = (mentorId: number): void => {
    if (mentor) {
      dispatch(coursesActions.changeMentor({ id: mentorId }));
      handleMentorCardShownToggle();

      return;
    }
    dispatch(coursesActions.chooseMentor({ id: mentorId }));
    handleMentorCardShownToggle();
  };

  useEffect(() => {
    setIsMentorCardShown(!isMentorChoosingEnabled);
  }, [isMentorChoosingEnabled]);

  useFocusEffect(
    useCallback(() => {
      if (course) {
        dispatch(coursesActions.updateIsMentorChoosingEnabled(course?.id));
      }
    }, [course]),
  );

  return (
    <View style={styles.container}>
      {isMentorCardShown && mentor ? (
        <MentorCard
          mentor={mentor.userDetails}
          onChoose={handleMentorCardShownToggle}
          buttonLabel="Change mentor"
        />
      ) : (
        <ChooseMentor
          course={course}
          mentors={mentors}
          isLoading={areMentorsLoading}
          onChangeMentor={handleChooseMentor}
        />
      )}
    </View>
  );
};

export { MyMentor };
