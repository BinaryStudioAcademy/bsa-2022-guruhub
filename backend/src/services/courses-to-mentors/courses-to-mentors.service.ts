import { ExceptionMessage, ProtectedGroupKey } from '~/common/enums/enums';
import {
  CoursesToMentorsRequestDto,
  CoursesToMentorsResponseDto,
  CourseUpdateMentoringDto,
  GroupsItemResponseDto,
} from '~/common/types/types';
import {
  coursesToMentors as coursesToMentorsRep,
  group as groupRep,
} from '~/data/repositories/repositories';
import { CoursesToMentorsError } from '~/exceptions/exceptions';
import {
  menteesToMentors as menteesToMentorsServ,
  usersToGroups as usersToGroupsServ,
} from '~/services/services';

type Constructor = {
  coursesToMentorsRepository: typeof coursesToMentorsRep;
  usersToGroupsService: typeof usersToGroupsServ;
  menteesToMentorsService: typeof menteesToMentorsServ;
  groupRepository: typeof groupRep;
};

class CoursesToMentors {
  #coursesToMentorsRepository: typeof coursesToMentorsRep;

  #usersToGroupsService: typeof usersToGroupsServ;

  #groupRepository: typeof groupRep;

  #menteesToMentorsService: typeof menteesToMentorsServ;

  public constructor({
    coursesToMentorsRepository,
    usersToGroupsService,
    menteesToMentorsService,
    groupRepository,
  }: Constructor) {
    this.#coursesToMentorsRepository = coursesToMentorsRepository;
    this.#usersToGroupsService = usersToGroupsService;
    this.#groupRepository = groupRepository;
    this.#menteesToMentorsService = menteesToMentorsService;
  }

  public async createMentorToCourse({
    courseId,
    userId,
  }: CoursesToMentorsRequestDto): Promise<CoursesToMentorsResponseDto> {
    const isMentor = await this.checkIsMentor({
      courseId,
      userId,
    });

    if (isMentor) {
      throw new CoursesToMentorsError();
    }

    const isMentee = await this.#menteesToMentorsService.checkIsMentee({
      courseId,
      menteeId: userId,
    });

    if (isMentee) {
      throw new CoursesToMentorsError({
        message: ExceptionMessage.STUDENT_CANT_BE_MENTOR,
      });
    }

    const mentorsGroup = (await this.#groupRepository.getByKey(
      ProtectedGroupKey.MENTORS,
    )) as GroupsItemResponseDto;

    await this.#usersToGroupsService.createUsersToGroups({
      groupId: mentorsGroup.id,
      userId,
    });

    return this.#coursesToMentorsRepository.createMentorToCourse({
      courseId,
      userId,
    });
  }

  public updateStudentsCount(
    userId: number,
    data: CourseUpdateMentoringDto,
  ): Promise<number> {
    return this.#coursesToMentorsRepository.updateStudentsCount(userId, data);
  }

  public checkIsMentor({
    courseId,
    userId,
  }: CoursesToMentorsRequestDto): Promise<boolean> {
    return this.#coursesToMentorsRepository.checkIsMentor({
      courseId,
      userId,
    });
  }

  public checkIsMentorForAnyCourse(userId: number): Promise<boolean> {
    return this.#coursesToMentorsRepository.checkIsMentorForAnyCourse(userId);
  }
}

export { CoursesToMentors };
