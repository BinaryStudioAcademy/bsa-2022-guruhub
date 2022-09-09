import {
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