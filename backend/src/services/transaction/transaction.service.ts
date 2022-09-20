import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
  TransactionCreateArgumentsDto,
  TransactionGetAllItemResponseDto,
  TransactionUpdateStatusDto,
} from '~/common/types/types';
import { transaction as transactionRep } from '~/data/repositories/repositories';

type Constructor = {
  transactionRepository: typeof transactionRep;
};

class Transaction {
  #transactionRepository: typeof transactionRep;

  public constructor({ transactionRepository }: Constructor) {
    this.#transactionRepository = transactionRepository;
  }

  public getById(id: number): Promise<TransactionGetAllItemResponseDto> {
    return this.#transactionRepository.getById(id);
  }

  public getHoldBySenderAndReceiverId(
    senderId: number,
    receiverId: number,
  ): Promise<TransactionGetAllItemResponseDto> {
    return this.#transactionRepository.getHoldBySenderAndReceiverId(
      senderId,
      receiverId,
    );
  }

  public getByUserIdTransactions(
    userId: number,
    { count, page }: EntityPaginationRequestQueryDto,
  ): Promise<EntityPagination<TransactionGetAllItemResponseDto>> {
    const zeroIndexPage = page - 1;

    return this.#transactionRepository.getByUserIdTransactions(userId, {
      count,
      page: zeroIndexPage,
    });
  }

  public create(
    transactionCreateBody: TransactionCreateArgumentsDto,
  ): Promise<TransactionGetAllItemResponseDto> {
    return this.#transactionRepository.create(transactionCreateBody);
  }

  public updateStatus(
    transactionUpdateStatusBody: TransactionUpdateStatusDto,
  ): Promise<TransactionGetAllItemResponseDto> {
    return this.#transactionRepository.updateStatus(
      transactionUpdateStatusBody,
    );
  }
}

export { Transaction };
