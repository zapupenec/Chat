/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  typeModal: null,
  channelId: null,
};

const messagesSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setTypeModal: (state, { payload }) => { state.typeModal = payload; },
    setChannelId: (state, { payload }) => { state.channelId = payload; },
  },
});

const selectTypeModal = (state) => state.modals.typeModal;
const selectChannelId = (state) => state.modals.channelId;

export const { actions } = messagesSlice;
export const selectors = {
  selectTypeModal,
  selectChannelId,
};
export default messagesSlice.reducer;
