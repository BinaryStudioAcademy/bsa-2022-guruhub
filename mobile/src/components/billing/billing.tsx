import { StripeProvider } from '@stripe/stripe-react-native';
import React, { FC } from 'react';

import { DataStatus } from '~/common/enums/enums';
import { BillingReplenishToken } from '~/common/types/types';
import { Spinner } from '~/components/common/common';
import { useAppDispatch, useAppSelector, useEffect } from '~/hooks/hooks';
import { billingActions } from '~/store/actions';

import {
  DEFAULT_REPLENISH_AMOUNTS,
  REPLENISH_PUBLIC_KEY,
} from './common/common';
import { PaymentScreen } from './components/components';

const Billing: FC = () => {
  const { billingDataStatus, userMoneyBalance } = useAppSelector(
    ({ billing }) => ({
      billingDataStatus: billing.dataStatus,
      userMoneyBalance: billing.userMoneyBalance,
    }),
  );

  const dispatch = useAppDispatch();

  const handleWithdraw = (): void => {
    dispatch(billingActions.withdraw({ userCurrentBalance: userMoneyBalance }));
  };

  const handleReplenish = (
    amountOfMoneyToReplenish: number,
    token: BillingReplenishToken,
  ): void => {
    dispatch(billingActions.replenish({ amountOfMoneyToReplenish, token }));
  };

  useEffect(() => {
    dispatch(billingActions.getUserWithMoneyBalance());
  }, []);

  if (billingDataStatus === DataStatus.PENDING) {
    return <Spinner isOverflow />;
  }

  return (
    <StripeProvider publishableKey={REPLENISH_PUBLIC_KEY}>
      <PaymentScreen
        replenishKey={REPLENISH_PUBLIC_KEY}
        replenishingPricesDtos={DEFAULT_REPLENISH_AMOUNTS}
        moneyBalance={userMoneyBalance}
        onReplenish={handleReplenish}
        onWithdraw={handleWithdraw}
      />
    </StripeProvider>
  );
};

export { Billing };
