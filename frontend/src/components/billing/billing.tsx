import { AppRoute, DataStatus, NotificationMessage } from 'common/enums/enums';
import {
  FC,
  Token,
  UserGetResponseWithMoneyBalanceDto,
} from 'common/types/types';
import { Button, Spinner } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useNavigate,
} from 'hooks/hooks';
import { notification } from 'services/services';
import { billingActions } from 'store/actions';

import { DEFAULT_REPLENISH_AMOUNTS, REPLENISH_PUBLIC_KEY } from './common';
import { ReplenishCardsList } from './components/components';
import styles from './styles.module.scss';

const MINIMAL_AMOUNT_OF_MONEY_TO_WITHDRAW = 1;

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

  useEffect(() => {
    dispatch(billingActions.getUserWithMoneyBalance());
  }, [dispatch]);

  const handleWithdraw = (): void => {
    if (
      (userWithMoneyBalance as UserGetResponseWithMoneyBalanceDto).userDetails
        .moneyBalance >= MINIMAL_AMOUNT_OF_MONEY_TO_WITHDRAW
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
            <div>
              <Button
                label="Withdraw your funds"
                btnColor="blue"
                onClick={handleWithdraw}
              />
            </div>
            <h1>
              Your balance is {userWithMoneyBalance.userDetails.moneyBalance}$
            </h1>
          </div>
        </div>
        <ReplenishCardsList
          replenishKey={REPLENISH_PUBLIC_KEY}
          replenishingPricesDtos={DEFAULT_REPLENISH_AMOUNTS}
          onReplenish={handleReplenish}
        />
      </div>
    )
  );
};

export { Billing };
