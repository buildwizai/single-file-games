import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  promptModalOpen: false,
  promptModalContent: null,
  promptModalTitle: '',
  promptModalGameId: null,
  isLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openPromptModal(state, action) {
      state.promptModalOpen = true;
      state.promptModalGameId = action.payload.gameId;
      state.promptModalTitle = action.payload.title || 'Game Prompt';
    },
    closePromptModal(state) {
      state.promptModalOpen = false;
    },
    setPromptModalContent(state, action) {
      state.promptModalContent = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { 
  openPromptModal, 
  closePromptModal,
  setPromptModalContent,
  setLoading
} = uiSlice.actions;

export default uiSlice.reducer;