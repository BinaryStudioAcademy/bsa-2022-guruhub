import { createAsyncThunk } from '@reduxjs/toolkit';

import { CoursesGetAllResponseDto } from '~/common/types/courses/courses';
import { AsyncThunkConfig } from '~/common/types/types';

import { ActionType } from './common';

const MOCK_COURSES = [
  {
    id: '1',
    title: 'Coumplete giude to ASP.Net ',
    vendor_name: 'udemy',
    difficulty: 'Intermediate',
    author_name: 'Ivan Englishman',
    rating_star: '4.4',
    ratings_count: 206269,
    is_bestseller: true,
    price: 33.33,
    course_image: 'https://img-c.udemycdn.com/course/240x135/14346_9972_8.jpg',
  },
  {
    id: '2',
    title: 'Coumplete giude to ASP.NetCoumplete giude to ASP.Net',
    vendor_name: 'coursera',
    difficulty: 'Master',
    author_name: 'Ivan Englishman',
    rating_star: '4.4',
    ratings_count: 206269,
    is_bestseller: false,
    price: 33.33,
    course_image: 'https://img-c.udemycdn.com/course/240x135/709660_24ad_7.jpg',
  },
  {
    id: '3',
    title: 'Coumplete giude to ASP.Net',
    vendor_name: '',
    difficulty: 'Begginer',
    author_name: 'Ivan Englishman',
    rating_star: '4.4',
    ratings_count: 206269,
    is_bestseller: true,
    price: 33.33,
    course_image: 'https://img-c.udemycdn.com/course/240x135/14346_9972_8.jpg',
  },
  {
    id: '4',
    title: 'Coumplete giude to ASP.NetCoumplete giude to ASP.Net',
    vendor_name: 'coursera',
    difficulty: 'Master',
    author_name: 'Ivan Englishman',
    rating_star: '4.4',
    ratings_count: 206269,
    is_bestseller: false,
    price: 33.33,
    course_image: 'https://img-c.udemycdn.com/course/240x135/709660_24ad_7.jpg',
  },
];

type PayloadType = {
  filters?: any;
};

const loadCourses = createAsyncThunk<
  CoursesGetAllResponseDto,
  PayloadType,
  AsyncThunkConfig
>(ActionType.GET_COURSES, () => {
  //const { coursesApi } = extra;
  //const courses = await coursesApi.getAllCourses(filters);
  return MOCK_COURSES;
});

export { loadCourses };
