/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
  defaultChannelId: null,
  isSwitchToDefault: false,
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
        state.isSwitchToDefault = true;
      }
      channelsAdapter.removeOne(state, payload);
    },
    setCurrentChannelId: (state, { payload }) => { state.currentChannelId = payload; },
    setDedaultChannelId: (state, { payload }) => { state.defaultChannelId = payload; },
    setHasAdd: (state, { payload }) => { state.hasAdd = payload; },
    setIsSwitchToDefault: (state, { payload }) => { state.isSwitchToDefault = payload; },
  },
});

const selectorsAdapter = channelsAdapter.getSelectors((state) => state.channels);
const selectCurrentChannelId = (state) => state.channels.currentChannelId;

const selectChannelById = (id) => (state) => selectorsAdapter.selectById(state, id);
const selectHasAdd = (state) => state.channels.hasAdd;
const selectIsSwitchToDefault = (state) => state.channels.isSwitchToDefault;

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
  selectIsSwitchToDefault,
  selectChanelNames,
};
export default channelsSlice.reducer;
