import { combineReducers } from '@reduxjs/toolkit';
import gamesReducer from './slices/gamesSlice';
import uiReducer from './slices/uiSlice';
import statsReducer from './slices/statsSlice';

export const rootReducer = combineReducers({
  games: gamesReducer,
  ui: uiReducer,
  stats: statsReducer,
});