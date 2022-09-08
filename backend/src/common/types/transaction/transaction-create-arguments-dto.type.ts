import { TransactionStatus } from '~/common/enums/enums';

type TransactionCreateArgumentsDto = {
  senderId: number;
  receiverId: number;
  amount: number;
  status: TransactionStatus;
};

export { type TransactionCreateArgumentsDto };
