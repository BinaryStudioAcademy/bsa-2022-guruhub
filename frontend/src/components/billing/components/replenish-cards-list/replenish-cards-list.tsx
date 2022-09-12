import { FC } from 'common/types/types';
import { Token } from 'react-stripe-checkout';

import { ReplenishCard } from './components/components';
import styles from './styles.module.scss';

type Props = {
  replenishKey: string;
  replenishingPrices: number[];
  onReplenish: (amountOfMoneyToReplenish: number, token: Token) => void;
};

const ReplenishCardsList: FC<Props> = ({
  replenishingPrices,
  onReplenish,
  replenishKey,
}) => {
  return (
    <div className={styles.cardsWrapper}>
      {replenishingPrices.map((price) => {
        return (
          <ReplenishCard
            key={price}
            amount={price}
            onReplenish={onReplenish}
            replenishKey={replenishKey}
          />
        );
      })}
    </div>
  );
};

export { ReplenishCardsList };
