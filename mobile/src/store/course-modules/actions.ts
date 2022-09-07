import { createAsyncThunk } from '@reduxjs/toolkit';

//import { TaskStatus } from '~/common/enums/enums';
import {
  AsyncThunkConfig,
  CourseModuleGetByIdResponseDto,
  CourseModuleGetRequestParamsDto,
  CourseModulesGetAllRequestParamsDto,
  CourseModulesGetAllResponseDto,
  EntityPagination,
  TaskByIdRequestParamsDto,
  TaskGetByMenteeIdAndModuleId,
  TaskGetItemReponseDto,
  TaskNoteGetItemResponseDto,
  TaskNoteManipulateRequestDto,
} from '~/common/types/types';

import { ActionType } from './common';

const getCourseModules = createAsyncThunk<
  CourseModulesGetAllResponseDto,
  CourseModulesGetAllRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_COURSE_MODULES, async ({ courseId }, { extra }) => {
  const { courseModulesApi } = extra;
  const courseModules = await courseModulesApi.getAll({ courseId });

  return courseModules;
});

const getModuleById = createAsyncThunk<
  CourseModuleGetByIdResponseDto,
  CourseModuleGetRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_MODULE_BY_ID, async ({ courseId, moduleId }, { extra }) => {
  const { courseModulesApi } = extra;
  const courseModule = await courseModulesApi.getById({ courseId, moduleId });

  return courseModule;
});

const createNote = createAsyncThunk<
  TaskNoteGetItemResponseDto,
  TaskNoteManipulateRequestDto,
  AsyncThunkConfig
>(ActionType.MANIPULATE_TASK_NOTE, async ({ body, taskId }, { extra }) => {
  const { tasksApi } = extra;
  const newNote = await tasksApi.manipulate({ body, taskId });

  return newNote;
});

// const taskTest = {
//   id: 1,
//     menteesToMentorsId: 2,
//     moduleId: 3,
//     status: TaskStatus.UNCOMPLETED,
// };

const getTask = createAsyncThunk<
  TaskGetItemReponseDto | null,
  TaskGetByMenteeIdAndModuleId,
  AsyncThunkConfig
>(ActionType.GET_TASK, async ({ menteeId, moduleId }, { extra }) => {
  const { tasksApi } = extra;
  const task = await tasksApi.getByMenteeIdAndModuleId({ menteeId, moduleId });

  if (!task) {
    return null;
  }

  return task;
});
// const notes = [
//   {
//     id: 1,
//     author: {
//       id: 3,
//       email: '3pc@ukr.,et',
//       createdAt: '2022-09-03T08:13:01.699Z',
//       userDetails: {
//         id: 4,
//         fullName: 'Ihor Honcharenko',
//         gender: null,
//         avatar:  { url: 'https://www.pngall.com/wp-content/uploads/8/Young-Man-PNG-Image.png'},
//         dateOfBirth:null,
//       },
//     },
//     note: 'Adding some things',
//     createdAt: '2022-09-03T08:13:01.699Z',
//     status: TaskStatus.PENDING,
//   },
//   {
//     id: 2,
//     author: {
//       id: 4,
//       email: '3pc@ukr.,et',
//       createdAt: '2022-09-03T08:13:01.699Z',
//       userDetails: {
//         id: 5,
//         fullName: 'Oleksandr Blovk',
//         gender: null,
//         avatar:  null,
//         dateOfBirth:null,
//       },
//     },
//     note: 'Adding some things Adding some things Adding some things Adding some things',
//     createdAt: '2022-09-03T08:13:01.699Z',
//     status: TaskStatus.UNCOMPLETED,
//   },
//   {
//     id: 3,
//     author: {
//       id: 5,
//       email: '3pc@ukr.,et',
//       createdAt: '2022-09-03T08:13:01.699Z',
//       userDetails: {
//         id: 6,
//         fullName: 'Oleksandr Blovk',
//         gender: null,
//         avatar:  null,
//         dateOfBirth:null,
//       },
//     },
//     note: 'Adding some things',
//     createdAt: '2022-09-03T08:13:01.699Z',
//     status: TaskStatus.REJECTED,
//   },
//   {
//     id: 6,
//     author: {
//       id: 9,
//       email: '3pc@ukr.,et',
//       createdAt: '2022-09-03T08:13:01.699Z',
//       userDetails: {
//         id: 9,
//         fullName: 'Oleksandr Blovk',
//         gender: null,
//         avatar:  null,
//         dateOfBirth:null,
//       },
//     },
//     note: 'Adding some things',
//     createdAt: '2022-09-03T08:13:01.699Z',
//     status: TaskStatus.COMPLETED,
//   },
// ];

// const notesTest = {
//   items: notes,
//   total: 3,
// }

const getNotes = createAsyncThunk<
  EntityPagination<TaskNoteGetItemResponseDto>,
  TaskByIdRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_NOTES, async ({ taskId }, { extra }) => {
  const { tasksApi } = extra;
  const notes = await tasksApi.getNotes({ taskId });

  return notes;
});

export { createNote, getCourseModules, getModuleById, getNotes, getTask };
