import { Card } from './card.type';

type BillingReplenishToken = {
  id: string;
  object: string;
  card: Card;
  client_ip: string;
  created: number;
  email: string;
  livemode: boolean;
  type: string;
  used: boolean;
};

export { type BillingReplenishToken };
