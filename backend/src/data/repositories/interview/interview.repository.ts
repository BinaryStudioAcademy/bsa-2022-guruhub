import { Interview as InterviewM } from '~/data/models/models';

type Constructor = {
  InterviewModel: typeof InterviewM;
};

class Interview {
  #InterviewModel: typeof InterviewM;

  public constructor({ InterviewModel }: Constructor) {
    this.#InterviewModel = InterviewModel;
  }

  public async getAll(): Promise<InterviewM[]> {
    return this.#InterviewModel.query();
  }

  public async getById(id: number): Promise<InterviewM | null> {
    const interview = await this.#InterviewModel
      .query()
      .select()
      .where({ id })
      .first();

    return interview ?? null;
  }
}

export { Interview };
