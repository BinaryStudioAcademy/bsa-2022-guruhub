import { InterviewStatus, PermissionKey } from '~/common/enums/enums';
import {
  InterviewsByIdResponseDto,
  InterviewsCreateRequestDto,
  InterviewsGetAllResponseDto,
  InterviewsResponseDto,
  PermissionsGetAllItemResponseDto,
} from '~/common/types/types';
import { interview as interviewRep } from '~/data/repositories/repositories';
import { InterviewsError } from '~/exceptions/exceptions';
import { checkHasPermission } from '~/helpers/helpers';

type Constructor = {
  interviewRepository: typeof interviewRep;
};

class Interview {
  #interviewRepository: typeof interviewRep;

  public constructor({ interviewRepository }: Constructor) {
    this.#interviewRepository = interviewRepository;
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
      await this.getInterviewByUserIdAndCategoryId(
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

  public async getPendingOrPassedInterviewsCategoryIdsByUserId(
    intervieweeUserId: number,
  ): Promise<number[]> {
    const interviewsByUserId =
      await this.#interviewRepository.getInterviewsByIntervieweeUserId(
        intervieweeUserId,
      );

    return interviewsByUserId
      .filter((interview) => interview.status !== InterviewStatus.REJECTED)
      .map((interview) => interview.categoryId);
  }

  public getInterviewByUserIdAndCategoryId(
    intervieweeUserId: number,
    categoryId: number,
  ): Promise<InterviewsResponseDto | null> {
    return this.#interviewRepository.getInterviewByUserIdAndCategoryId(
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
}

export { Interview };
