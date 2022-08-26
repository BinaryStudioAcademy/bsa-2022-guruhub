import { FC } from 'common/types/types';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
} from 'hooks/hooks';
import { interviewActions } from 'store/actions';

const Interview: FC = () => {
  const { otherInterviews } = useAppSelector((state) => state.interview);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(interviewActions.getOtherByInterviewId(Number(id)));
  }, []);

  return (
    <div>
      {otherInterviews.map((int) => (
        <p>{int.courseCategory.name}</p>
      ))}
    </div>
  );
};

export { Interview };
