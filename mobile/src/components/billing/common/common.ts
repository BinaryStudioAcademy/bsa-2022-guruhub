import { ENV } from '~/common/enums/enums';

import { ReplenishAmount } from '../types/types';

const REPLENISH_PUBLIC_KEY = ENV.APP.REPLENISH_PUBLIC_KEY;

const DEFAULT_REPLENISH_AMOUNTS: readonly ReplenishAmount[] = [
  { id: 1, value: 50 },
  { id: 2, value: 75 },
  { id: 3, value: 100 },
  { id: 4, value: 150 },
  { id: 5, value: 300 },
  { id: 6, value: 500 },
] as const;

export { DEFAULT_REPLENISH_AMOUNTS, REPLENISH_PUBLIC_KEY };
