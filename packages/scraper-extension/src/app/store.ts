import {
  Action,
  configureStore,
  ThunkAction
} from '@reduxjs/toolkit';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import scraperReducer from '../features/scraper/scraperSlice';

export const store = configureStore({
  reducer: {
    scraper: scraperReducer,
    dashboard: dashboardReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
