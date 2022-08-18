import { UdemyChapterGetResponseDto } from './udemy-chapter-get-response-dto.type';
import { UdemyLectureGetResponseDto } from './udemy-lecture-get-response-dto/udemy-lecture-get-response-dto.type';
import { UdemyPracticeGetResponseDto } from './udemy-practice-get-response-dto.type';
import { UdemyQuizGetResponseDto } from './udemy-quiz-get-response-dto.type';

type UdemyModulesGetResponseDto = {
  results: (
    | UdemyLectureGetResponseDto
    | UdemyPracticeGetResponseDto
    | UdemyQuizGetResponseDto
    | UdemyChapterGetResponseDto
  )[];
};

export { type UdemyModulesGetResponseDto };
