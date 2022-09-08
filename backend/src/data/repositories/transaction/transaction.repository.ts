import { Transaction as TransactionM } from '~/data/models/models';

type Constructor = {
  TransactionModel: typeof TransactionM;
};

class Transaction {
  #TransactionModel: typeof TransactionM;

  public constructor({ TransactionModel }: Constructor) {
    this.#TransactionModel = TransactionModel;
  }
}

export { Transaction };
