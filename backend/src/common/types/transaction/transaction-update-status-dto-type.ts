import { TransactionStatus } from '~/common/enums/enums';

type TransactionUpdateStatusDto = {
  transactionId: number;
  newSatus: TransactionStatus;
};

export { type TransactionUpdateStatusDto };
