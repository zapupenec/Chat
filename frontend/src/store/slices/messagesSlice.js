/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

import { actions as channelsActions } from './channelsSlice.js';
import { api } from '../../api/index.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState({
  hasAdd: false,
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    setHasAdd: (state, { payload }) => { state.hasAdd = payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.removeChannel, (state, action) => {
        const channelId = action.payload;
        const restEntities = Object.values(state.entities).filter((e) => e.channelId !== channelId);
        messagesAdapter.setAll(state, restEntities);
      })
      .addCase(api.fetchData.fulfilled, (state, { payload }) => {
        const { messages } = payload;
        messagesAdapter.setAll(state, messages);
      });
  },
});

const selectorsAdapter = messagesAdapter.getSelectors((state) => state.messages);
const selectHasAdd = (state) => state.messages.hasAdd;

const selectMessagesByChannelId = (id) => createSelector(selectorsAdapter.selectAll, (state) => {
  const selectedMessages = state.filter((m) => m.channelId === id);
  return selectedMessages;
});

export const { actions } = messagesSlice;
export const selectors = {
  ...selectorsAdapter,
  selectHasAdd,
  selectMessagesByChannelId,
};
export default messagesSlice.reducer;
