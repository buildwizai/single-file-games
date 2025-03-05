import { all } from 'redux-saga/effects';
import { watchFetchGames, watchViewGamePrompt } from './gamesSaga';
import { watchFetchStats } from './statsSaga';

export default function* rootSaga() {
  yield all([
    watchFetchGames(),
    watchViewGamePrompt(),
    watchFetchStats(),
  ]);
}