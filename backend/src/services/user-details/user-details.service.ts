import { ContentType } from '~/common/enums/enums';
import {
  UserDetailsResponseDto,
  UserDetailsUpdateInfoRequestDto,
} from '~/common/types/types';
import { userDetails as userDetailsRep } from '~/data/repositories/repositories';
import { file as fileServ } from '~/services/services';

type Constructor = {
  userDetailsRepository: typeof userDetailsRep;
  fileService: typeof fileServ;
};

class UserDetails {
  #userDetailsRepository: typeof userDetailsRep;

  #fileService: typeof fileServ;

  public constructor({ userDetailsRepository, fileService }: Constructor) {
    this.#userDetailsRepository = userDetailsRepository;
    this.#fileService = fileService;
  }

  public async update(
    userId: number,
    userDetailsUpdateInfoRequestDto: UserDetailsUpdateInfoRequestDto,
  ): Promise<UserDetailsResponseDto | null> {
    const userDetails = await this.#userDetailsRepository.update(
      userId,
      userDetailsUpdateInfoRequestDto,
    );

    return userDetails ?? null;
  }

  public async create(
    userId: number,
    userDetailsUpdateInfoRequestDto: UserDetailsUpdateInfoRequestDto,
  ): Promise<UserDetailsResponseDto> {
    const userDetails = await this.#userDetailsRepository.create(
      userId,
      userDetailsUpdateInfoRequestDto,
    );

    return userDetails;
  }

  public async getByUserId(
    userId: number,
  ): Promise<UserDetailsResponseDto | null> {
    const userDetails = await this.#userDetailsRepository.getByUserId(userId);

    return userDetails ?? null;
  }

  public async uploadAvatar(
    userId: number,
    file: Buffer,
  ): Promise<UserDetailsResponseDto> {
    const user = await this.#userDetailsRepository.getByUserId(userId);

    if (!user) {
      throw new Error();
    }

    const newFile = await this.#fileService.uploadFile({
      bucket: `${user.fullName.toLowerCase()}-avatar`,
      contentType: ContentType.IMAGE,
      file,
      fileName: Date.now().toString(),
    });

    return this.#userDetailsRepository.updateAvatarFileId(user.id, newFile.id);
  }
}

export { UserDetails };
