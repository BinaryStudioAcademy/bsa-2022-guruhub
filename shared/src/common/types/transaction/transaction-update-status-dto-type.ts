import { TransactionStatus } from '~/common/enums/enums';

type TransactionUpdateStatusDto = {
  transactionId: number;
  newStatus: TransactionStatus;
};

export { type TransactionUpdateStatusDto };
