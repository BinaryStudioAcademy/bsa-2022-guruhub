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
    </div>
  );
};

export { ReplenishCard };
