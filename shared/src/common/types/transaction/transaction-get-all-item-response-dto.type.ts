import { TransactionStatus } from '~/common/enums/enums';

import { UsersGetResponseDto } from '../types';

type TransactionGetAllItemResponseDto = {
  id: number;
  createdAt: string;
  amount: number;
  status: TransactionStatus;
  sender: UsersGetResponseDto;
  receiver: UsersGetResponseDto;
};

export { type TransactionGetAllItemResponseDto };
