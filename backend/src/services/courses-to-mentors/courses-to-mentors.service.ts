import { ExceptionMessage, ProtectedGroupKey } from '~/common/enums/enums';
import {
  CoursesToMentorsRequestDto,
  CoursesToMentorsResponseDto,
  GroupsItemResponseDto,
} from '~/common/types/types';
import { coursesToMentors as coursesToMentorsRep } from '~/data/repositories/repositories';
import { CoursesToMentorsError } from '~/exceptions/exceptions';
import {
  group as groupServ,
  menteesToMentors as menteesToMentorsServ,
  usersToGroups as usersToGroupsServ,
} from '~/services/services';

type Constructor = {
  coursesToMentorsRepository: typeof coursesToMentorsRep;
  usersToGroupsService: typeof usersToGroupsServ;
  groupService: typeof groupServ;
  menteesToMentorsService: typeof menteesToMentorsServ;
};

class CoursesToMentors {
  #coursesToMentorsRepository: typeof coursesToMentorsRep;

  #usersToGroupsService: typeof usersToGroupsServ;

  #groupService: typeof groupServ;

  #menteesToMentorsService: typeof menteesToMentorsServ;

  public constructor({
    coursesToMentorsRepository,
    usersToGroupsService,
    groupService,
    menteesToMentorsService,
  }: Constructor) {
    this.#coursesToMentorsRepository = coursesToMentorsRepository;
    this.#usersToGroupsService = usersToGroupsService;
    this.#groupService = groupService;
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

    const mentorsGroup = (await this.#groupService.getByKey(
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

  public checkIsMentor({
    courseId,
    userId,
  }: CoursesToMentorsRequestDto): Promise<boolean> {
    return this.#coursesToMentorsRepository.checkIsMentor({
      courseId,
      userId,
    });
  }
}

export { CoursesToMentors };
