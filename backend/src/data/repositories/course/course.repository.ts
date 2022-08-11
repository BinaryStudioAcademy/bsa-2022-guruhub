import { Course as CourseM } from '~/data/models/models';

type Constructor = {
  CourseModel: typeof CourseM;
};

class Course {
  #CourseModel: typeof CourseM;

  constructor({ CourseModel }: Constructor) {
    this.#CourseModel = CourseModel;
  }

  async create(course: {
    title: string;
    description: string;
    url: string;
  }): Promise<CourseM> {
    const { title, description, url } = course;

    return this.#CourseModel.query().insert({
      title,
      description,
      url,
    });
  }
}

export { Course };
