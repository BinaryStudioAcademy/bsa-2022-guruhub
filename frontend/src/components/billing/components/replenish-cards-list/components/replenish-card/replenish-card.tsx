import { PaymentUnit } from 'common/enums/enums';
import { FC } from 'common/types/types';
import StripeCheckout, { Token } from 'react-stripe-checkout';

import styles from './styles.module.scss';

type Props = {
  replenishKey: string;
  amount: number;
  onReplenish: (amountOfMoneyToReplenish: number, token: Token) => void;
};

const ReplenishCard: FC<Props> = ({ amount, onReplenish, replenishKey }) => {
  const handleReplenish = (token: Token): void => {
    onReplenish(amount, token);
  };

  return (
    <div className={styles.replenishCardWrapper}>
      <h1 className={styles.amount}>{amount}$</h1>
      <StripeCheckout
        stripeKey={replenishKey}
        label="Replenish"
        name="Pay with credit card"
        billingAddress
        shippingAddress
        amount={amount * PaymentUnit.CENTS_IN_ONE_DOLLAR}
        description={`Your total is ${amount}`}
        token={handleReplenish}
      />
    </div>
  );
};

export { ReplenishCard };
