import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
  CategoryGetAllResponseDto,
  CourseCategoryGetByIdRequestParamsDto,
  CourseCategoryGetResponseDto,
} from '~/common/types/types';

import { ActionType } from './common';

const getExistCategories = createAsyncThunk<
  CategoryGetAllResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_ALL_EXIST_CATEGORIES, async (_, { extra }) => {
  const { categoriesApi } = extra;
  const categoriesDto = await categoriesApi.getAllExist();

  return categoriesDto;
});

const getAllCategories = createAsyncThunk<
  CategoryGetAllResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_ALL_CATEGORIES, async (_, { extra }) => {
  const { categoriesApi } = extra;
  const categoriesDto = await categoriesApi.getAll();

  return categoriesDto;
});

const getCategoryById = createAsyncThunk<
  CourseCategoryGetResponseDto,
  CourseCategoryGetByIdRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_CATEGORY, async (id, { extra }) => {
  const { categoriesApi } = extra;
  const courseCategory = await categoriesApi.getById(id);

  return courseCategory;
});

const clearCategory = createAction(ActionType.CLEAR_CATEGORY);

export { clearCategory, getAllCategories, getCategoryById, getExistCategories };
