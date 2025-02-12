import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {postsSlice} from './slices/postsSlice.ts';
import {mmkvStorage} from '../utils/reduxStorage.ts';
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
  key: 'posts',
  storage: mmkvStorage,
};

const rootReducer = combineReducers({
  posts: persistReducer(persistConfig, postsSlice.reducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
