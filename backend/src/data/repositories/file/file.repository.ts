import { FileTableInsertRequestDto } from '~/common/types/types';
import { File as FileM } from '~/data/models/models';

type Constructor = {
  FileModel: typeof FileM;
};

class File {
  #FileModel: typeof FileM;

  public constructor({ FileModel }: Constructor) {
    this.#FileModel = FileModel;
  }

  public create({
    contentType,
    url,
  }: FileTableInsertRequestDto): Promise<FileM> {
    return this.#FileModel.query().insert({ contentType, url }).execute();
  }
}

export { File };
