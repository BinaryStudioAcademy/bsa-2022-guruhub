import { AppRoute, DataStatus, NotificationMessage } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Button, Spinner } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useNavigate,
} from 'hooks/hooks';
import { Token } from 'react-stripe-checkout';
import { notification } from 'services/services';
import { billingActions } from 'store/actions';

import { DEFAULT_REPLENISH_AMOUNTS, REPLENISH_PUBLIC_KEY } from './common';
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
    if (
      userWithMoneyBalance &&
      userWithMoneyBalance?.userDetails.moneyBalance >= 1
    ) {
      dispatch(billingActions.withdraw());
    } else {
      notification.info(NotificationMessage.NOT_ENOUGH_FUNDS_TO_WITHDRAW);
    }
  };

  const handleReplenish = (
    amountOfMoneyToReplenish: number,
    token: Token,
  ): void => {
    dispatch(billingActions.replenish({ amountOfMoneyToReplenish, token }));
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
          replenishKey={REPLENISH_PUBLIC_KEY}
          replenishingPrices={DEFAULT_REPLENISH_AMOUNTS}
          onReplenish={handleReplenish}
        />
      </div>
    )
  );
};

export { Billing };
