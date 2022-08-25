import mentorImage from 'assets/img/mentor.png';
import { FC } from 'common/types/types';
import { Button, Image } from 'components/common/common';
import { useAppDispatch, useAppSelector, useParams } from 'hooks/hooks';
import { courseActions } from 'store/actions';

import styles from './styles.module.scss';

const BecomeAMentor: FC = () => {
  const { isMentorButtonVisible, passedInterviewsCategoryIds, course, user } =
    useAppSelector((state) => ({ ...state.course, ...state.auth }));
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const handleClick = (): void => {
    if (!course || !user) {
      return;
    }

    if (passedInterviewsCategoryIds.includes(course.courseCategoryId)) {
      dispatch(
        courseActions.createMentor({ courseId: Number(id), userId: user.id }),
      );

      return;
    }

    dispatch(
      courseActions.createInterview({
        categoryId: course.courseCategoryId,
        intervieweeUserId: user.id,
      }),
    );
  };

  if (!isMentorButtonVisible) {
    return null;
  }

  return (
    <div className={styles.mentorWrapper}>
      <div className={styles.imageWrapper}>
        <Image
          src={mentorImage}
          alt="Mentor Image"
          height="100%"
          width="100%"
        />
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          label="Become a Mentor"
          btnType="filled"
          btnColor="blue"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export { BecomeAMentor };
