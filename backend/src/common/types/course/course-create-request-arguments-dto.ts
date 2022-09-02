type CourseCreateRequestArgumentsDto = {
  title: string;
  description: string;
  url: string;
  vendorId: number;
  courseCategoryId?: number;
  originalId: string;
  imageUrl?: string;
};

export { type CourseCreateRequestArgumentsDto };
