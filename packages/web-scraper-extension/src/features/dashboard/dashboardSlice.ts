import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  DashboardState,
  Page,
  Recipes,
  User
} from '../../interfaces/dashboard';

const initialState: DashboardState = {
  user: null,
  currentPage: {
    paginate: {
      limit: NaN,
      delay: NaN,
      active: false,
      selector: ''
    },
    name: '',
    hostname: '',
    url: '',
    resultSchema: {},
    results: [],
    createAt: '',
    updateAt: '',
    histories: {},
    totalScraped: 0
  },
  recipes: {}
};

export const scraperSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    updateRecipes(state, actions) {
      state.recipes = actions.payload;
    },
    updateRecipe(state, { payload }) {
      const { hostname, id, recipe } = payload;

      state.recipes[hostname][Number(id) - 1] = recipe;
    },
    saveToRecipe(state, actions) {
      const { url } = actions.payload;
      const { hostname } = new URL(url);

      if (hostname in state.recipes) {
        state.recipes[hostname].push(actions.payload);
      } else {
        state.recipes[hostname] = [actions.payload];
      }
    },
    updateCurrentPage(state, actions) {
      state.currentPage = {
        ...state.currentPage,
        ...actions.payload
      };
    },
    deleteRecipe(state, actions) {
      const { hostname, index } = actions.payload;

      state.recipes[hostname].splice(index, 1);

      if (state.recipes[hostname].length === 0) {
        delete state.recipes[hostname];
      }
    },
    deletePage(state, actions) {
      const { hostname, url } = actions.payload;

      delete state.recipes[hostname][url];
    }
  }
});

export const {
  updateRecipes,
  updateRecipe,
  saveToRecipe,
  updateCurrentPage,
  deleteRecipe,
  deletePage
} = scraperSlice.actions;

export const getUser = (state: RootState): User =>
  state.dashboard.user!;

export const getCurrentPage = (state: RootState): Page =>
  state.dashboard.currentPage;

export const getRecipes = (state: RootState): Recipes =>
  state.dashboard.recipes;

export default scraperSlice.reducer;
