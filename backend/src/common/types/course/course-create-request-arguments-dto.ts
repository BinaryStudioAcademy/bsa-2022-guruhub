type CourseCreateRequestArgumentsDto = {
  title: string;
  description: string;
  url: string;
  vendorId: number;
  courseCategoryId?: number;
  originalId: number;
};

export { type CourseCreateRequestArgumentsDto };
