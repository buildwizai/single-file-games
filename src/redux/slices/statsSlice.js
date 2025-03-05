import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stars: 0,
  forks: 0,
  issues: 0,
  loading: false,
  error: null,
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    fetchStatsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStatsSuccess(state, action) {
      state.loading = false;
      state.stars = action.payload.stargazers_count;
      state.forks = action.payload.forks_count;
      state.issues = action.payload.open_issues_count;
    },
    fetchStatsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { 
  fetchStatsStart, 
  fetchStatsSuccess, 
  fetchStatsFailure 
} = statsSlice.actions;

export default statsSlice.reducer;