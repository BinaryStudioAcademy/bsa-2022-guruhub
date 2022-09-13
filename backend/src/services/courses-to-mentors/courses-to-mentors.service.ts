import { ProtectedGroupKey } from '~/common/enums/enums';
import {
  CoursesToMentorsRequestDto,
  CoursesToMentorsResponseDto,
  GroupsItemResponseDto,
} from '~/common/types/types';
import {
  coursesToMentors as coursesToMentorsRep,
  group as groupRep,
} from '~/data/repositories/repositories';
import { CoursesToMentorsError } from '~/exceptions/exceptions';
import { usersToGroups as usersToGroupsServ } from '~/services/services';

type Constructor = {
  coursesToMentorsRepository: typeof coursesToMentorsRep;
  usersToGroupsService: typeof usersToGroupsServ;
  groupRepository: typeof groupRep;
};

class CoursesToMentors {
  #coursesToMentorsRepository: typeof coursesToMentorsRep;

  #usersToGroupsService: typeof usersToGroupsServ;

  #groupRepository: typeof groupRep;

  public constructor({
    coursesToMentorsRepository,
    usersToGroupsService,
    groupRepository,
  }: Constructor) {
    this.#coursesToMentorsRepository = coursesToMentorsRepository;
    this.#usersToGroupsService = usersToGroupsService;
    this.#groupRepository = groupRepository;
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
