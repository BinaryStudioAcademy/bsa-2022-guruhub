import { FC } from 'common/types/types';
import { Button } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  amount: number;
  onReplenish: (amountOfMoneyToReplenish: number) => void;
};

const ReplenishCard: FC<Props> = ({ amount, onReplenish }) => {
  const handleReplenish = (): void => {
    onReplenish(amount);
  };

  return (
    <div className={styles.replenishCardWrapper}>
      <h1 className={styles.amount}>{`${amount}$`}</h1>
      <Button label="Replenish" btnColor="blue" onClick={handleReplenish} />
      {/* <StripeCheckout
        stripeKey="pk_test_51LfPDzBwVLfGD9Cv51EPgpttHUKYfT5L9oB2FIR8LFHEKlBAs5wbPuiDru4gZpgthQvJIQ3Aq5lLcuvh7F3P5A1i00jsud9jbC"
        label="Pay Now"
        name="Pay with credit card"
        billingAddress
        shippingAddress
        amount={amount * 100}
        description={`Your total is ${amount}`}
        token={}
      /> */}
    </div>
  );
};

export { ReplenishCard };
