import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  ThunkAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import proxyList from './proxyListSlice';
import proxies from './proxySlice';
import user from './userSlice';

const reducer = combineReducers({
  user,
  proxyList,
  proxies,
});

const store = configureStore({
  reducer,
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
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const wrapper = createWrapper(() => store, { debug: true });

export default store;
