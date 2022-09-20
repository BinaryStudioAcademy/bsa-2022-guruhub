import { TransactionStatus } from 'common/enums/enums';

type TransactionsTableRow = {
  type: 'Spending' | 'Income';
  price: number;
  status: TransactionStatus;
  date: string;
};

export { type TransactionsTableRow };
