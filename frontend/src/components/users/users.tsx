import { AppRoute, DataStatus } from 'common/enums/enums';
import { User } from 'common/types/types';
import { Link } from 'components/common/common';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { usersActions } from 'store/actions';

type StoreValues = {
	isLoadingUsers: boolean;
	users: User[];
};

const Users: React.FC = () => {
	const dispatch = useAppDispatch();
	const { isLoadingUsers, users } = useAppSelector<StoreValues>(({ users: { dataStatus, users } }) => {
		return {
			isLoadingUsers: dataStatus !== DataStatus.FULFILLED,
			users
		};
	});

	useEffect(() => {
		dispatch(usersActions.getUsers());
	}, []);

	if (isLoadingUsers) {
		return <span>Loading...</span>;
	}

	const getUsersList = (): JSX.Element => {
		if (!users.length) {
			return <span>No Users signed</span>;
		}

		return (
			<ul>
				{users.map(({ email }) => (
					<li key={email}>
						{email}
					</li>
				))}
			</ul>
		);
	};

	return (
		<>
			<h3>Users:</h3>
			{getUsersList()}
			<br />
			<Link to={AppRoute.SIGN_UP}>Sign Up new User</Link>
		</>
	);
};

export { Users };
