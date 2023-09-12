/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

import { fetchData } from './initSlice';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    updateChannel: channelsAdapter.updateOne,
    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        const id = state.ids[0];
        state.currentChannelId = id;
      }
      channelsAdapter.removeOne(state, payload);
    },
    setCurrentChannelId: (state, { payload }) => { state.currentChannelId = payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        channelsAdapter.addMany(state, channels);
        state.currentChannelId = currentChannelId;
      });
  },
});

const selectorsAdapter = channelsAdapter.getSelectors((state) => state.channels);
const selectCurrentChannelId = (state) => state.channels.currentChannelId;

const selectChannelById = (id) => (state) => selectorsAdapter.selectById(state, id);

const selectChanelNames = createSelector(selectorsAdapter.selectAll, (state) => {
  const chanelNames = state.map((c) => c.name);
  return chanelNames;
});

export const { actions } = channelsSlice;
export const selectors = {
  ...selectorsAdapter,
  selectCurrentChannelId,
  selectChannelById,
  selectChanelNames,
};
export default channelsSlice.reducer;
