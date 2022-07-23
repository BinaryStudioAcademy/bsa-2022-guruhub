import { AppRoute } from 'common/enums/enums';
import { Routes, Route } from 'components/common/common';
import { useLocation } from 'hooks/hooks';
import { Auth } from '../auth/auth';
import { Users } from '../users/users';

const App: React.FC = () => {
	const { pathname } = useLocation();

	return (
		<>
			<p>Current path: {pathname}</p>

			<div>
				<Routes>
					<Route path={AppRoute.SIGN_UP} element={<Auth />} />
					<Route path={AppRoute.ROOT} element={<Users />} />
				</Routes>
			</div>
		</>
	);
};

export { App };
