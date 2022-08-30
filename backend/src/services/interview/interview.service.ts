import {
  ExceptionMessage,
  InterviewStatus,
  PermissionKey,
} from '~/common/enums/enums';
import {
  EntityPagination,
  InterviewNoteCreateRequestArgumentsDto,
  InterviewNoteGetAllItemResponseDto,
  InterviewNoteGetAllResponseDto,
  InterviewsByIdResponseDto,
  InterviewsCreateRequestDto,
  InterviewsGetAllItemResponseDto,
  InterviewsGetAllRequestDto,
  InterviewsGetByUserIdRequestDto,
  InterviewsGetInterviewerResponseDto,
  InterviewsGetOtherItemResponseDto,
  InterviewsGetOtherRequestDto,
  InterviewsResponseDto,
  InterviewsUpdateRequestDto,
} from '~/common/types/types';
import { interview as interviewRep } from '~/data/repositories/repositories';
import { InterviewsError } from '~/exceptions/exceptions';
import { checkHasPermission } from '~/helpers/helpers';

import { interviewNote as interviewNoteServ } from '../services';

type Constructor = {
  interviewRepository: typeof interviewRep;
  interviewNoteService: typeof interviewNoteServ;
};

class Interview {
  #interviewRepository: typeof interviewRep;

  #interviewNoteService: typeof interviewNoteServ;

  public constructor({
    interviewRepository,
    interviewNoteService,
  }: Constructor) {
    this.#interviewRepository = interviewRepository;
    this.#interviewNoteService = interviewNoteService;
  }

  public getAll(
    args: InterviewsGetAllRequestDto,
  ): Promise<EntityPagination<InterviewsGetAllItemResponseDto>> {
    const { userId, permissions, page, count } = args;
    const hasInterviewsPermission = checkHasPermission({
      permissionKeys: [PermissionKey.MANAGE_INTERVIEWS],
      userPermissions: permissions,
    });
    const zeroIndexPage = page - 1;

    if (!hasInterviewsPermission) {
      return this.getByUserId({
        userId,
        page: zeroIndexPage,
        count,
      });
    }

    return this.#interviewRepository.getAll({
      page: zeroIndexPage,
      count,
    });
  }

  public async getById(id: number): Promise<InterviewsByIdResponseDto | null> {
    const interview = await this.#interviewRepository.getById(id);

    return interview ?? null;
  }

  public getInterviewersByCategoryId(
    interviewId: number,
  ): Promise<InterviewsGetInterviewerResponseDto[]> {
    return this.#interviewRepository.getInterviewersByCategoryId(interviewId);
  }

  public async create({
    categoryId,
    intervieweeUserId,
    status,
  }: InterviewsCreateRequestDto): Promise<InterviewsResponseDto> {
    const interviewByUserIdAndCategoryId =
      await this.getInterviewByIntervieweeUserIdAndCategoryId(
        intervieweeUserId,
        categoryId,
      );

    const hasInterview = Boolean(interviewByUserIdAndCategoryId);

    if (
      hasInterview &&
      interviewByUserIdAndCategoryId?.status !== InterviewStatus.REJECTED
    ) {
      throw new InterviewsError();
    }

    return this.#interviewRepository.create({
      categoryId,
      intervieweeUserId,
      status,
    });
  }

  public async getPassedInterviewsCategoryIdsByUserId(
    intervieweeUserId: number,
  ): Promise<number[]> {
    const interviewsByUserId =
      await this.#interviewRepository.getPassedInterviewsByUserId(
        intervieweeUserId,
      );

    return interviewsByUserId.map((interview) => interview.categoryId);
  }

  public getInterviewByIntervieweeUserIdAndCategoryId(
    intervieweeUserId: number,
    categoryId: number,
  ): Promise<InterviewsResponseDto | null> {
    return this.#interviewRepository.getInterviewByIntervieweeUserIdAndCategoryId(
      intervieweeUserId,
      categoryId,
    );
  }

  public getByUserId({
    count,
    page,
    userId,
  }: InterviewsGetByUserIdRequestDto): Promise<
    EntityPagination<InterviewsGetAllItemResponseDto>
  > {
    return this.#interviewRepository.getByUserId({
      userId,
      page,
      count,
    });
  }

  public async update(data: {
    id: number;
    interviewUpdateInfoRequestDto: InterviewsUpdateRequestDto;
  }): Promise<InterviewsByIdResponseDto> {
    const { id, interviewUpdateInfoRequestDto } = data;
    const { interviewerUserId } = interviewUpdateInfoRequestDto;

    const interview = await this.#interviewRepository.update({
      id,
      interviewerUserId,
    });

    return interview;
  }

  public getAllNotes(
    interviewId: number,
  ): Promise<InterviewNoteGetAllResponseDto> {
    return this.#interviewNoteService.getAll(interviewId);
  }

  public createNote(
    interviewNotCreateDto: InterviewNoteCreateRequestArgumentsDto,
  ): Promise<InterviewNoteGetAllItemResponseDto> {
    return this.#interviewNoteService.create(interviewNotCreateDto);
  }

  public async getOtherByInterviewId({
    interviewId,
    count,
    page,
  }: InterviewsGetOtherRequestDto): Promise<
    EntityPagination<InterviewsGetOtherItemResponseDto>
  > {
    const interview = await this.getById(interviewId);

    if (!interview) {
      throw new InterviewsError({
        message: ExceptionMessage.INTERVIEW_DOES_NOT_EXIST,
      });
    }

    const intervieweeUserId = interview.interviewee.id;
    const zeroIndexPage = page - 1;

    return this.#interviewRepository.getOtherByInterviewId({
      interviewId,
      intervieweeUserId,
      count,
      page: zeroIndexPage,
    });
  }
}

export { Interview };
