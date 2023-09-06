/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
  defaultChannelId: null,
  hasAdd: false,
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
        state.currentChannelId = state.defaultChannelId;
      }
      channelsAdapter.removeOne(state, payload);
    },
    setCurrentChannelId: (state, { payload }) => { state.currentChannelId = payload; },
    setDedaultChannelId: (state, { payload }) => { state.defaultChannelId = payload; },
    setHasAdd: (state, { payload }) => { state.hasAdd = payload; },
  },
});

const selectorsAdapter = channelsAdapter.getSelectors((state) => state.channels);
const selectCurrentChannelId = (state) => state.channels.currentChannelId;

const selectChannelById = (id) => (state) => selectorsAdapter.selectById(state, id);
const selectHasAdd = (state) => state.channels.hasAdd;

const selectChanelNames = createSelector(selectorsAdapter.selectAll, (state) => {
  const chanelNames = state.map((c) => c.name);
  return chanelNames;
});

export const { actions } = channelsSlice;
export const selectors = {
  ...selectorsAdapter,
  selectCurrentChannelId,
  selectChannelById,
  selectHasAdd,
  selectChanelNames,
};
export default channelsSlice.reducer;
