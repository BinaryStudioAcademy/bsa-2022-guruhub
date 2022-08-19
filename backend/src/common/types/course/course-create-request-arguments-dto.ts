type CourseCreateRequestArgumentsDto = {
  title: string;
  description: string;
  url: string;
  vendorId: number;
  courseCategoryId?: number;
  originalId: string;
};

export { type CourseCreateRequestArgumentsDto };
