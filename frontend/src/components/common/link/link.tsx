import { NavLink } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';

type Props = {
	children: React.ReactNode;
	to: AppRoute;
};

const Link: React.FC<Props> = ({ children, to }) => (
	<NavLink to={to}>{children}</NavLink>
);

export { Link };
