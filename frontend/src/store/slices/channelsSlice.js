/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { api } from '../../api';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
  defaultChannelId: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => {
      state.currentChannelId = payload.id;
      channelsAdapter.addOne(state, payload);
    },
    updateChannel: channelsAdapter.updateOne,
    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        state.currentChannelId = state.defaultChannelId;
      }
      channelsAdapter.removeOne(state, payload);
    },
    setCurrentChannelId: (state, { payload }) => { state.currentChannelId = payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(api.fetchData.fulfilled, (state, { payload }) => {
        const { channels, currentChannelId } = payload;
        state.currentChannelId = currentChannelId;
        state.defaultChannelId = currentChannelId;
        channelsAdapter.setAll(state, channels);
      });
  },
});

const selectorsAdapter = channelsAdapter.getSelectors((state) => state.channels);
const selectCurrentChannelId = (state) => state.channels.currentChannelId;
const selectDefaultChannelId = (state) => state.channels.defaultChannelId;

const selectChanelNames = createSelector(selectorsAdapter.selectAll, (state) => {
  const chanelNames = state.map((c) => c.name);
  return chanelNames;
});

export const { actions } = channelsSlice;
export const selectors = {
  ...selectorsAdapter,
  selectCurrentChannelId,
  selectDefaultChannelId,
  selectChanelNames,
};
export default channelsSlice.reducer;
