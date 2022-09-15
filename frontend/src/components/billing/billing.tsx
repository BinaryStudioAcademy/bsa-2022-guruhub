import { AppRoute, DataStatus } from 'common/enums/enums';
import { FC, Token } from 'common/types/types';
import { Button, Spinner } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useNavigate,
} from 'hooks/hooks';
import { billingActions } from 'store/actions';

import { DEFAULT_REPLENISH_AMOUNTS, REPLENISH_PUBLIC_KEY } from './common';
import { ReplenishCardsList } from './components/components';
import styles from './styles.module.scss';

const Billing: FC = () => {
  const { authDataStatus, user, billingDataStatus, userMoneyBalance } =
    useAppSelector(({ auth, billing }) => ({
      authDataStatus: auth.dataStatus,
      user: auth.user,
      billingDataStatus: billing.dataStatus,
      userMoneyBalance: billing.userMoneyBalance,
    }));

  const navigate = useNavigate();

  if (!user) {
    navigate(AppRoute.ROOT);
  }

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(billingActions.getUserWithMoneyBalance());
  }, [dispatch]);

  const handleWithdraw = (): void => {
    dispatch(
      billingActions.withdraw({ usersCurrentBalance: userMoneyBalance }),
    );
  };

  const handleReplenish = (
    amountOfMoneyToReplenish: number,
    token: Token,
  ): void => {
    dispatch(billingActions.replenish({ amountOfMoneyToReplenish, token }));
  };

  if (
    billingDataStatus === DataStatus.PENDING ||
    authDataStatus === DataStatus.PENDING
  ) {
    return <Spinner />;
  }

  return (
    <div className={styles.billing}>
      <div className={styles.yourBalanceSectionWrapper}>
        <div className={styles.yourBalanceSection}>
          <div>
            <Button
              label="Withdraw your funds"
              btnColor="blue"
              onClick={handleWithdraw}
            />
          </div>
          <h1>Your balance is {userMoneyBalance}$</h1>
        </div>
      </div>
      <ReplenishCardsList
        replenishKey={REPLENISH_PUBLIC_KEY}
        replenishingPricesDtos={DEFAULT_REPLENISH_AMOUNTS}
        onReplenish={handleReplenish}
      />
    </div>
  );
};

export { Billing };
