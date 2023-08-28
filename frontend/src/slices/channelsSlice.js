/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: 0,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    updateChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
    setCurrentChannelId: (state, { payload }) => { state.currentChannelId = payload; },
  },
});

export const { actions } = channelsSlice;
export const selectors = {
  ...channelsAdapter.getSelectors((state) => state.channels),
  selectCurrentChannelId: (state) => state.channels.currentChannelId,
};
export default channelsSlice.reducer;
