import { FC } from 'common/types/types';
import { Button } from 'components/common/common';
import { useAppDispatch, useAppSelector, useParams } from 'hooks/hooks';
import { courseActions } from 'store/actions';

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
    <div>
      <Button
        label="Become a Mentor"
        btnType="filled"
        btnColor="blue"
        onClick={handleClick}
      />
    </div>
  );
};

export { BecomeAMentor };
