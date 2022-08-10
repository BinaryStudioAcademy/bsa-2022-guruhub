import { createAsyncThunk } from '@reduxjs/toolkit';

import { Course } from '~/common/types/courses/courses';
import { AsyncThunkConfig } from '~/common/types/types';

import { ActionType } from './common';

const courses = [
  {
    id: '1',
    title: 'Coumplete giude to ASP.Net ',
    vendor_name: 'udemy',
    difficulty: 'Intermediate',
    author_name: 'Ivan Englishman',
    rating_star: '4.4',
    ratings_count: 206269,
    isBestseller: true,
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
    isBestseller: false,
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
    isBestseller: true,
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
    isBestseller: false,
    price: 33.33,
    course_image: 'https://img-c.udemycdn.com/course/240x135/709660_24ad_7.jpg',
  },
];

type PayloadType = {
  filters?: any;
};

const loadCourses = createAsyncThunk<Course[], PayloadType, AsyncThunkConfig>(
  ActionType.SET_ALL_COURSES,
  () => {
    //const { coursesApi } = extra;
    //const courses = await coursesApi.getAllCourses(filters);
    return courses;
  },
);

export { loadCourses };
