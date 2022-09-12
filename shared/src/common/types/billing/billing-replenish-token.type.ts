import { BillingCard } from './billing-card.type';

type BillingReplenishToken = {
  id: string;
  object: string;
  card: BillingCard;
  client_ip: string;
  created: number;
  email: string;
  livemode: boolean;
  type: string;
  used: boolean;
};

export { type BillingReplenishToken };
