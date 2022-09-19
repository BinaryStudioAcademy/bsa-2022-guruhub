import { SortOrder, TransactionStatus } from '~/common/enums/enums';
import {
  TransactionCreateArgumentsDto,
  TransactionGetAllItemResponseDto,
  TransactionUpdateStatusDto,
} from '~/common/types/types';
import { Transaction as TransactionM } from '~/data/models/models';

type Constructor = {
  TransactionModel: typeof TransactionM;
};
const INITIAL_TRANSACTION_STATUS = TransactionStatus.PENDING;

class Transaction {
  #TransactionModel: typeof TransactionM;

  public constructor({ TransactionModel }: Constructor) {
    this.#TransactionModel = TransactionModel;
  }

  public getById(id: number): Promise<TransactionGetAllItemResponseDto> {
    return this.#TransactionModel
      .query()
      .findById(id)
      .withGraphJoined(
        '[sender(withoutPassword).[userDetails], receiver(withoutPassword).[userDetails]]',
      )
      .castTo<TransactionGetAllItemResponseDto>()
      .execute();
  }

  public getByUserIdTransactions(
    userId: number,
  ): Promise<TransactionGetAllItemResponseDto[]> {
    return this.#TransactionModel
      .query()
      .where('senderId', userId)
      .orWhere('receiverId', userId)
      .withGraphJoined(
        '[sender(withoutPassword).[userDetails], receiver(withoutPassword).[userDetails]]',
      )
      .orderBy('createdAt', SortOrder.DESC)
      .castTo<TransactionGetAllItemResponseDto[]>()
      .execute();
  }

  public getHoldBySenderAndReceiverId(
    senderId: number,
    receiverId: number,
  ): Promise<TransactionGetAllItemResponseDto> {
    return this.#TransactionModel
      .query()
      .where('senderId', senderId)
      .andWhere('receiverId', receiverId)
      .andWhere('status', TransactionStatus.HOLD)
      .first()
      .withGraphJoined(
        '[sender(withoutPassword).[userDetails], receiver(withoutPassword).[userDetails]]',
      )
      .castTo<TransactionGetAllItemResponseDto>()
      .execute();
  }

  public create({
    senderId,
    receiverId,
    amount,
  }: TransactionCreateArgumentsDto): Promise<TransactionGetAllItemResponseDto> {
    return this.#TransactionModel
      .query()
      .insert({
        senderId,
        receiverId,
        amount,
        status: INITIAL_TRANSACTION_STATUS,
      })
      .withGraphFetched(
        '[sender(withoutPassword).[userDetails], receiver(withoutPassword).[userDetails]]',
      )
      .castTo<TransactionGetAllItemResponseDto>()
      .execute();
  }

  public updateStatus({
    transactionId,
    newStatus,
  }: TransactionUpdateStatusDto): Promise<TransactionGetAllItemResponseDto> {
    return this.#TransactionModel
      .query()
      .patchAndFetchById(transactionId, {
        status: newStatus,
      })
      .withGraphFetched(
        '[sender(withoutPassword).[userDetails], receiver(withoutPassword).[userDetails]]',
      )
      .castTo<TransactionGetAllItemResponseDto>()
      .execute();
  }
}

export { Transaction };
