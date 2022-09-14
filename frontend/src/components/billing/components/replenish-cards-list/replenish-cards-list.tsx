import { FC } from 'common/types/types';
import { ReplenishAmount } from 'components/billing/types/types';
import { Token } from 'react-stripe-checkout';

import { ReplenishCard } from './components/components';
import styles from './styles.module.scss';

type Props = {
  replenishKey: string;
  replenishingPricesDtos: readonly ReplenishAmount[];
  onReplenish: (amountOfMoneyToReplenish: number, token: Token) => void;
};

const ReplenishCardsList: FC<Props> = ({
  replenishingPricesDtos,
  onReplenish,
  replenishKey,
}) => {
  return (
    <div className={styles.cardsWrapper}>
      {replenishingPricesDtos.map((dto) => {
        return (
          <ReplenishCard
            key={dto.id}
            amount={dto.value}
            onReplenish={onReplenish}
            replenishKey={replenishKey}
          />
        );
      })}
    </div>
  );
};

export { ReplenishCardsList };
