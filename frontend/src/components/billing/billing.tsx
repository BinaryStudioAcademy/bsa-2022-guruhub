import { AppRoute, DataStatus } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Button, Spinner } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useNavigate,
} from 'hooks/hooks';
import { billingActions } from 'store/actions';

import { DEFAULT_REPLENISH_AMOUNTS } from './common';
import { ReplenishCardsList } from './components/components';
import styles from './styles.module.scss';

const Billing: FC = () => {
  const { authDataStatus, user, billingDataStatus, userWithMoneyBalance } =
    useAppSelector(({ auth, billing }) => ({
      authDataStatus: auth.dataStatus,
      user: auth.user,
      billingDataStatus: billing.dataStatus,
      userWithMoneyBalance: billing.userWithMoneyBalance,
    }));

  const navigate = useNavigate();

  if (!user) {
    navigate(AppRoute.ROOT);
  }

  const dispatch = useAppDispatch();

  const handleWithdraw = (): void => {
    dispatch(billingActions.withdraw());
  };

  const handleReplenish = (amountOfMoneyToReplenish: number): void => {
    dispatch(billingActions.replenish({ amountOfMoneyToReplenish }));
  };

  useEffect(() => {
    dispatch(billingActions.getUserWithMoneyBalance());
  }, [dispatch]);

  if (
    billingDataStatus === DataStatus.PENDING ||
    authDataStatus === DataStatus.PENDING
  ) {
    return <Spinner />;
  }

  return (
    userWithMoneyBalance && (
      <div className={styles.billing}>
        <div className={styles.yourBalanceSectionWrapper}>
          <div className={styles.yourBalanceSection}>
            <Button
              label="Withdraw your funds"
              btnColor="blue"
              onClick={handleWithdraw}
            />
            <h1>
              {`Your balance is ${userWithMoneyBalance.userDetails.moneyBalance}$`}
            </h1>
          </div>
        </div>
        <ReplenishCardsList
          replenishingPrices={DEFAULT_REPLENISH_AMOUNTS}
          onReplenish={handleReplenish}
        />
      </div>
    )
  );
};

export { Billing };
