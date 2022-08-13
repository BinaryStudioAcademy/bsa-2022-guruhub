import { FC } from 'common/types/types';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { userDetailsActions } from 'store/actions';

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const { userDetails } = useAppSelector((state) => state.userDetails);

  useEffect(() => {
    dispatch(userDetailsActions.getUserDetails());
  }, []);

  return <div>{userDetails?.id}</div>;
};

export { Profile };
