import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import proxyListReducer from './proxyListSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    proxyList: proxyListReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
