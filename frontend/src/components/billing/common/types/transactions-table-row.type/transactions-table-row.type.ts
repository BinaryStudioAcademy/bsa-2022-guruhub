import { TransactionStatus, TransactionType } from 'common/enums/enums';

type TransactionsTableRow = {
  type: TransactionType;
  price: number;
  status: TransactionStatus;
  date: string;
};

export { type TransactionsTableRow };
