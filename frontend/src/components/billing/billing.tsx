import { DataStatus, PaginationDefaultValue } from 'common/enums/enums';
import { FC, Token, UserWithPermissions } from 'common/types/types';
import { Button, Spinner } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  usePagination,
} from 'hooks/hooks';
import { billingActions } from 'store/actions';

import {
  DEFAULT_REPLENISH_AMOUNTS,
  REPLENISH_PUBLIC_KEY,
} from './common/common';
import { ReplenishCardsList, TransactionsTable } from './components/components';
import styles from './styles.module.scss';

const Billing: FC = () => {
  const {
    billingDataStatus,
    userMoneyBalance,
    transactions,
    totalTransactionsNumber,
    user,
  } = useAppSelector(({ billing, auth }) => ({
    billingDataStatus: billing.dataStatus,
    userMoneyBalance: billing.userMoneyBalance,
    transactions: billing.transactions,
    totalTransactionsNumber: billing.totalTransactionsNumber,
    user: auth.user,
  }));
  const { page, handlePageChange } = usePagination({
    queryName: 'billingsPage',
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      billingActions.getUserTransactions({
        page,
        count: PaginationDefaultValue.DEFAULT_COUNT,
      }),
    );
  }, [page]);

  useEffect(() => {
    dispatch(billingActions.getUserWithMoneyBalance());
  }, [dispatch]);

  const handleWithdraw = (): void => {
    dispatch(billingActions.withdraw({ userCurrentBalance: userMoneyBalance }));
  };

  const handleReplenish = (
    amountOfMoneyToReplenish: number,
    token: Token,
  ): void => {
    dispatch(billingActions.replenish({ amountOfMoneyToReplenish, token }));
  };

  if (billingDataStatus === DataStatus.PENDING) {
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
      <TransactionsTable
        transactions={transactions}
        page={page}
        handlePageChange={handlePageChange}
        totalTransactionsNumber={totalTransactionsNumber}
        userId={(user as UserWithPermissions).id}
      />
    </div>
  );
};

export { Billing };
