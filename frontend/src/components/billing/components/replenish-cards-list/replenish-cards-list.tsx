import { FC } from 'common/types/types';

import { ReplenishCard } from './components/components';
import styles from './styles.module.scss';

type Props = {
  replenishingPrices: number[];
  onReplenish: (amountOfMoneyToReplenish: number) => void;
};

const ReplenishCardsList: FC<Props> = ({ replenishingPrices, onReplenish }) => {
  return (
    <div className={styles.cardsWrapper}>
      {replenishingPrices.map((price) => {
        return (
          <ReplenishCard key={price} amount={price} onReplenish={onReplenish} />
        );
      })}
    </div>
  );
};

export { ReplenishCardsList };
