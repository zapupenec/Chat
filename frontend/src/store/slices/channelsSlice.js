/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

import { api } from '../../api';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
  defaultChannelId: null,
  isLoading: true,
  historyLength: 0,
  hasAdd: false,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    updateChannel: channelsAdapter.updateOne,
    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        state.currentChannelId = state.defaultChannelId;
      }
      channelsAdapter.removeOne(state, payload);
    },
    setCurrentChannelId: (state, { payload }) => { state.currentChannelId = payload; },
    setHistoryLength: (state, { payload }) => { state.historyLength = payload; },
    setHasAdd: (state, { payload }) => { state.hasAdd = payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(api.fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(api.fetchData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const { channels, currentChannelId } = payload;
        state.currentChannelId = currentChannelId;
        state.defaultChannelId = currentChannelId;
        channelsAdapter.setAll(state, channels);
      });
  },
});

const selectorsAdapter = channelsAdapter.getSelectors((state) => state.channels);
const selectIsLoading = (state) => state.channels.isLoading;

const selectCurrentChannelId = (state) => state.channels.currentChannelId;
const selectDefaultChannelId = (state) => state.channels.defaultChannelId;
// const channel = useSelector((state) => channelsSelectors.selectById(state, id));
const selectChannelById = (id) => (state) => selectorsAdapter.selectById(state, id);
const selectHistoryLength = (state) => state.channels.historyLength;
const selectHasAdd = (state) => state.channels.hasAdd;

const selectChanelNames = createSelector(selectorsAdapter.selectAll, (state) => {
  const chanelNames = state.map((c) => c.name);
  return chanelNames;
});

export const { actions } = channelsSlice;
export const selectors = {
  ...selectorsAdapter,
  selectIsLoading,
  selectCurrentChannelId,
  selectDefaultChannelId,
  selectChannelById,
  selectHistoryLength,
  selectHasAdd,
  selectChanelNames,
};
export default channelsSlice.reducer;
