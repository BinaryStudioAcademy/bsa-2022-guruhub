import { AppRoute } from 'common/enums/enums';
import { CreateUserPayload } from 'common/types/types';
import { Link } from 'components/common/common';
import { useAppDispatch, useNavigate } from 'hooks/hooks';
import { authActions } from 'store/actions';
import { SignUpForm } from './components/components';

const Auth: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSignUpSubmit = (payload: CreateUserPayload): void => {
		dispatch(authActions.signUp(payload))
			.then(() => {
				navigate(AppRoute.ROOT, { replace: true });
			});
	};

	return (
		<>
			<SignUpForm onSubmit={handleSignUpSubmit} />
			<Link to={AppRoute.ROOT}>Back to Users</Link>
		</>
	);
};

export { Auth };
