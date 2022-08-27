import { PaginationDefaultValue } from 'common/enums/enums';
import { FC } from 'common/types/types';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  usePagination,
  useParams,
} from 'hooks/hooks';
import { interviewActions } from 'store/actions';

const Interview: FC = () => {
  const { otherInterviews } = useAppSelector((state) => state.interview);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { page } = usePagination({
    queryName: 'otherInterviews',
  });

  useEffect(() => {
    dispatch(
      interviewActions.getOtherByInterviewId({
        interviewId: Number(id),
        page,
        count: PaginationDefaultValue.DEFAULT_COUNT,
      }),
    );
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
