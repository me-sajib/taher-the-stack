import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import colorPalate from '../../helpers/colorPalate';
import updateDetectionColor from '../../helpers/updateDetectionColor';
import type {
  ScraperState,
  Select
} from '../../interfaces/extension';

const initialState: ScraperState = {
  isScrapping: false,
  paginate: {
    selector: '',
    limit: 0,
    delay: 1,
    active: false
  },
  currentSelector: {
    name: 'Property1',
    uid: '',
    color: colorPalate.current,
    selectors: {},
    totalCount: 0
  },
  scrapeSelectors: {}
};

export const scraperSlice = createSlice({
  name: 'scraper',
  initialState,
  reducers: {
    toggleScrapping(state) {
      state.isScrapping = !state.isScrapping;
    },
    setPaginate(state, action) {
      state.paginate = {
        ...state.paginate,
        ...action.payload
      };
    },
    setCurrentSelector(state, { payload }) {
      state.currentSelector = {
        ...state.currentSelector,
        ...payload
      };

      updateDetectionColor(
        payload.color ?? state.currentSelector.color
      );
    },
    setScrapeSelector(state, action) {
      const { uid, ...rest } = action.payload;
      const color = colorPalate.next();

      state.currentSelector.color = color;
      state.scrapeSelectors[uid] = {
        ...rest,
        uid
      };
      updateDetectionColor(color);
    },
    editSelectProp(state, action) {
      const { uid, key, value } = action.payload;

      state.scrapeSelectors[uid][key as keyof Select] =
        value as never;
    },
    deleteScrapeSelector(state, action) {
      const { uid } = action.payload;

      delete state.scrapeSelectors[uid];
    },
    resetState(state, action) {
      const { excepts = [], all = false } = action.payload;
      const expectsSet = new Set([...excepts, 'paginate']);

      !all && expectsSet.add('scrapeSelectors');

      for (const key in initialState) {
        if (!expectsSet.has(key)) {
          state[key as keyof ScraperState] = initialState[
            key as keyof ScraperState
          ] as never;
        }
      }

      state.currentSelector = {
        ...state.currentSelector,
        name: `Property${
          Object.keys(state.scrapeSelectors).length + 1
        }`,
        color: colorPalate.current
      };
    }
  }
});

export const {
  toggleScrapping,
  setPaginate,
  setScrapeSelector,
  setCurrentSelector,
  editSelectProp,
  deleteScrapeSelector,
  resetState
} = scraperSlice.actions;

export const getIsScrapping = (state: RootState) =>
  state.scraper.isScrapping;

export const getPaginate = (state: RootState) =>
  state.scraper.paginate;

export const getCurrentSelector = (state: RootState) =>
  state.scraper.currentSelector;

export const getScrapeSelectors = (state: RootState) =>
  state.scraper.scrapeSelectors;

export default scraperSlice.reducer;
