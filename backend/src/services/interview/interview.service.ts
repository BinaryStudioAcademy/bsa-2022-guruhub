import { InterviewStatus, PermissionKey } from '~/common/enums/enums';
import {
  InterviewNoteCreateRequestArgumentsDto,
  InterviewNoteGetAllItemResponseDto,
  InterviewNoteGetAllResponseDto,
  InterviewsByIdResponseDto,
  InterviewsCreateRequestDto,
  InterviewsGetAllResponseDto,
  InterviewsResponseDto,
  PermissionsGetAllItemResponseDto,
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

  public async getAll(args: {
    userId: number;
    permissions: PermissionsGetAllItemResponseDto[];
  }): Promise<InterviewsGetAllResponseDto> {
    const { userId, permissions } = args;
    const hasInterviewsPermission = checkHasPermission({
      permissionKeys: [PermissionKey.MANAGE_INTERVIEWS],
      userPermissions: permissions,
    });

    if (!hasInterviewsPermission) {
      return this.getByUserId(userId);
    }

    const interviews = await this.#interviewRepository.getAll();

    return {
      items: interviews.map((interview) => ({
        id: interview.id,
        interviewDate: interview.interviewDate,
        status: interview.status,
        interviewee: {
          id: interview.interviewee.id,
          fullName: interview.interviewee.fullName,
          email: interview.interviewee.email,
          createdAt: interview.interviewee.createdAt,
        },
        interviewer: {
          id: interview.interviewer.id,
          fullName: interview.interviewer.fullName,
          email: interview.interviewer.email,
          createdAt: interview.interviewer.createdAt,
        },
        courseCategory: {
          id: interview.courseCategory.id,
          key: interview.courseCategory.key,
          name: interview.courseCategory.name,
        },
      })),
    };
  }

  public async getById(id: number): Promise<InterviewsByIdResponseDto | null> {
    const interview = await this.#interviewRepository.getById(id);

    if (!interview) {
      return null;
    }

    return {
      id: interview.id,
      interviewDate: interview.interviewDate,
      status: interview.status,
      interviewee: {
        id: interview.interviewee.id,
        fullName: interview.interviewee.fullName,
        email: interview.interviewee.email,
        createdAt: interview.interviewee.createdAt,
      },
      interviewer: {
        id: interview.interviewer.id,
        fullName: interview.interviewer.fullName,
        email: interview.interviewer.email,
        createdAt: interview.interviewer.createdAt,
      },
      courseCategory: {
        id: interview.courseCategory.id,
        key: interview.courseCategory.key,
        name: interview.courseCategory.name,
      },
    };
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

  public async getByUserId(
    userId: number,
  ): Promise<InterviewsGetAllResponseDto> {
    const interviews = await this.#interviewRepository.getByUserId(userId);

    return {
      items: interviews.map((interview) => ({
        id: interview.id,
        interviewDate: interview.interviewDate,
        status: interview.status,
        interviewee: {
          id: interview.interviewee.id,
          fullName: interview.interviewee.fullName,
          email: interview.interviewee.email,
          createdAt: interview.interviewee.createdAt,
        },
        interviewer: {
          id: interview.interviewer.id,
          fullName: interview.interviewer.fullName,
          email: interview.interviewer.email,
          createdAt: interview.interviewer.createdAt,
        },
        courseCategory: {
          id: interview.courseCategory.id,
          key: interview.courseCategory.key,
          name: interview.courseCategory.name,
        },
      })),
    };
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
}

export { Interview };
