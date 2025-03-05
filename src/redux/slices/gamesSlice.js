import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  games: [],
  loading: false,
  error: null,
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    fetchGamesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchGamesSuccess(state, action) {
      state.loading = false;
      state.games = action.payload;
    },
    fetchGamesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    viewGamePrompt(state, action) {
      // Redux will handle UI state in UI slice
    }
  },
});

export const { 
  fetchGamesStart, 
  fetchGamesSuccess, 
  fetchGamesFailure,
  viewGamePrompt
} = gamesSlice.actions;

export default gamesSlice.reducer;