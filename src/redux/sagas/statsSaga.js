import { takeLatest, put, call } from 'redux-saga/effects';
import { 
  fetchStatsStart,
  fetchStatsSuccess,
  fetchStatsFailure
} from '../slices/statsSlice';

// API Functions
async function fetchGitHubStats() {
  try {
    const response = await fetch('https://api.github.com/repos/buildwizai/single-file-games');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    throw error;
  }
}

// Saga Workers
function* fetchStatsWorker() {
  try {
    const stats = yield call(fetchGitHubStats);
    yield put(fetchStatsSuccess(stats));
  } catch (error) {
    yield put(fetchStatsFailure(error.message));
  }
}

// Saga Watchers
export function* watchFetchStats() {
  yield takeLatest(fetchStatsStart.type, fetchStatsWorker);
}