import {
  ExceptionMessage,
  HttpCode,
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
  InterviewsUpdateWithoutInterviewerRequestDto,
  UserWithPermissions,
} from '~/common/types/types';
import { interview as interviewRep } from '~/data/repositories/repositories';
import { InterviewsError } from '~/exceptions/exceptions';
import { changePaginationPage, checkHasPermission } from '~/helpers/helpers';

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
    const zeroIndexPage = changePaginationPage(page);

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

  public checkIsInterviewee(userId: number): Promise<boolean> {
    return this.#interviewRepository.checkIsInterviewee(userId);
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

  public async getActiveInterviewsCategoryIdsByUserId(
    intervieweeUserId: number,
  ): Promise<number[]> {
    const interviewsByUserId =
      await this.#interviewRepository.getActiveInterviewsByUserId(
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

  public checkIsIntervieweeOnInterview(interview: {
    interviewId: number;
    intervieweeUserId: number;
  }): Promise<boolean> {
    return this.#interviewRepository.checkIsIntervieweeOnInterview(interview);
  }

  public checkIsInterviewerOnInterview(interview: {
    interviewId: number;
    interviewerUserId: number;
  }): Promise<boolean> {
    return this.#interviewRepository.checkIsInterviewerOnInterview(interview);
  }

  public async update(data: {
    id: number;
    user: UserWithPermissions;
    interviewUpdateInfoRequestDto: InterviewsUpdateRequestDto;
  }): Promise<InterviewsByIdResponseDto> {
    const { id, user, interviewUpdateInfoRequestDto } = data;
    const { status, interviewDate } = interviewUpdateInfoRequestDto;

    const isInterviewee = await this.checkIsIntervieweeOnInterview({
      interviewId: id,
      intervieweeUserId: user.id,
    });

    if (isInterviewee) {
      throw new InterviewsError({
        message: ExceptionMessage.INTERVIEWEE_CAN_NOT_UPDATE_OWN_INTERVIEW,
        status: HttpCode.FORBIDDEN,
      });
    }

    const isInterviewer = await this.checkIsInterviewerOnInterview({
      interviewId: id,
      interviewerUserId: user.id,
    });

    if (isInterviewer) {
      const interview = await this.updateWithoutInterviewer({
        id,
        interviewUpdateInfoRequestDto: { status, interviewDate },
      });

      return interview;
    }

    const interview = await this.#interviewRepository.update(
      id,
      interviewUpdateInfoRequestDto,
    );

    return interview;
  }

  public updateWithoutInterviewer(data: {
    id: number;
    interviewUpdateInfoRequestDto: InterviewsUpdateWithoutInterviewerRequestDto;
  }): Promise<InterviewsByIdResponseDto> {
    const { id, interviewUpdateInfoRequestDto } = data;

    return this.#interviewRepository.update(id, interviewUpdateInfoRequestDto);
  }

  public getAllNotes(
    interviewId: number,
  ): Promise<InterviewNoteGetAllResponseDto> {
    return this.#interviewNoteService.getAll(interviewId);
  }

  public createNote(
    interviewNoteCreateDto: InterviewNoteCreateRequestArgumentsDto,
  ): Promise<InterviewNoteGetAllItemResponseDto> {
    return this.#interviewNoteService.create(interviewNoteCreateDto);
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
    const zeroIndexPage = changePaginationPage(page);

    return this.#interviewRepository.getOtherByInterviewId({
      interviewId,
      intervieweeUserId,
      count,
      page: zeroIndexPage,
    });
  }
}

export { Interview };
