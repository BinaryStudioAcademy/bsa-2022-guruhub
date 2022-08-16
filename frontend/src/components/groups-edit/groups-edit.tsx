import { DataStatus } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Spinner } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
} from 'hooks/hooks';
import { groupsEditActions } from 'store/actions';

const UAMGroupsEdit: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { dataStatus, group } = useAppSelector((state) => state.groupsEdit);

  useEffect(() => {
    dispatch(groupsEditActions.getGroupById({ id: Number(id) }));
  }, [id, dispatch]);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  return <div>{group?.name}</div>;
};

export { UAMGroupsEdit };
