import { TransactionGetAllItemResponseDto } from 'common/types/types';
import { TransactionsTableAccessor } from 'components/billing/common/enums/enums';
import { TransactionsTableRow } from 'components/billing/common/types/types';

const SPENDING_TYPE = 'Spending';
const INCOME_TYPE = 'Income';

const getTransactionsRows = (
  transactions: TransactionGetAllItemResponseDto[],
  userId: number,
): TransactionsTableRow[] => {
  return transactions.map((transaction): TransactionsTableRow => {
    const transactionType =
      transaction.sender.id === userId ? SPENDING_TYPE : INCOME_TYPE;

    return {
      [TransactionsTableAccessor.TYPE]: transactionType,
      [TransactionsTableAccessor.PRICE]: transaction.amount,
      [TransactionsTableAccessor.STATUS]: transaction.status,
      [TransactionsTableAccessor.DATE]: transaction.createdAt,
    };
  });
};

export { getTransactionsRows };
