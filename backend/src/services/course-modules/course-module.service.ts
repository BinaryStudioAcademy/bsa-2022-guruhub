// import { ExceptionMessage } from '~/common/enums/enums';
import {
  CourseChapterModuleCreateArgumentsDto,
  CourseChapterModuleResponseDto,
  CourseLectureAssetModuleCreateArgumentsDto,
  CourseLectureModuleCreateArgumentsDto,
  CourseLectureModuleResponseDto,
  CoursePracticeModuleCreateArgumentsDto,
  CoursePracticeModuleResponseDto,
  CourseQuizModuleCreateArgumentsDto,
  CourseQuizModuleResponseDto,
  // UdemyModulesGetResponseDto,
} from '~/common/types/types';
import {
  courseChapterModule as chapterModuleRep,
  courseLectureAssetModule as lectureModuleAssetRep,
  courseLectureModule as lectureModuleRep,
  coursePracticeModule as practiceModuleRep,
  courseQuizModule as quizModuleRep,
} from '~/data/repositories/repositories';
// import { CoursesModulesError } from '~/exceptions/exceptions';
import { udemyCourseModule as udemyServ } from '~/services/services';

type Constructor = {
  chapterModuleRepository: typeof chapterModuleRep;
  lectureModuleRepository: typeof lectureModuleRep;
  lectureModuleAssetRepository: typeof lectureModuleAssetRep;
  practiceModuleRepository: typeof practiceModuleRep;
  quizModuleRepository: typeof quizModuleRep;
  udemyService: typeof udemyServ;
};

class CourseModule {
  #chapterModuleRepository: typeof chapterModuleRep;

  #lectureModuleRepository: typeof lectureModuleRep;

  #lectureModuleAssetRepository: typeof lectureModuleAssetRep;

  #practiceModuleRepository: typeof practiceModuleRep;

  #quizModuleRepository: typeof quizModuleRep;

  #udemyService: typeof udemyServ;

  public constructor({
    chapterModuleRepository,
    lectureModuleRepository,
    lectureModuleAssetRepository,
    practiceModuleRepository,
    quizModuleRepository,
    udemyService,
  }: Constructor) {
    this.#chapterModuleRepository = chapterModuleRepository;
    this.#lectureModuleRepository = lectureModuleRepository;
    this.#lectureModuleAssetRepository = lectureModuleAssetRepository;
    this.#practiceModuleRepository = practiceModuleRepository;
    this.#quizModuleRepository = quizModuleRepository;
    this.#udemyService = udemyService;
  }

  public async createChapter(
    chapterRequestDto: CourseChapterModuleCreateArgumentsDto,
  ): Promise<CourseChapterModuleResponseDto> {
    const { title, description, sortOrder, courseId } = chapterRequestDto;

    return await this.#chapterModuleRepository.create({
      description,
      title,
      sortOrder,
      courseId,
    });
  }

  public async createLecture(
    assetRequestDto: CourseLectureAssetModuleCreateArgumentsDto,
    lectureRequestDto: CourseLectureModuleCreateArgumentsDto,
  ): Promise<CourseLectureModuleResponseDto> {
    const {
      id: assetId,
      title: assetTitle,
      assetType,
    } = await this.#lectureModuleAssetRepository.create(assetRequestDto);

    const {
      title: lectureTitle,
      description,
      sortOrder,
      courseId,
    } = lectureRequestDto;

    const createdLecture = await this.#lectureModuleRepository.create({
      title: lectureTitle,
      description,
      sortOrder,
      courseId,
      assetId,
    });

    return {
      ...createdLecture,
      asset: {
        id: assetId,
        title: assetTitle,
        assetType,
      },
    };
  }

  public async createPractice(
    practiceRequestDto: CoursePracticeModuleCreateArgumentsDto,
  ): Promise<CoursePracticeModuleResponseDto> {
    const { title, sortOrder, courseId } = practiceRequestDto;

    return await this.#practiceModuleRepository.create({
      title,
      sortOrder,
      courseId,
    });
  }

  public async createQuiz(
    quizRequestDto: CourseQuizModuleCreateArgumentsDto,
  ): Promise<CourseQuizModuleResponseDto> {
    const { title, description, sortOrder, passPercent, courseId } =
      quizRequestDto;

    return await this.#quizModuleRepository.create({
      title,
      description,
      sortOrder,
      passPercent,
      courseId,
    });
  }

  public async createModulesByCourseId(courseId: number): Promise<void> {
    const courseData = await this.#udemyService.getByCourseId(courseId);
    JSON.stringify(courseData);
  }
}

export { CourseModule };
