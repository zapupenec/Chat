/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { api } from '../../api';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    updateChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
    setCurrentChannelId: (state, { payload }) => { state.currentChannelId = payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(api.fetchData.fulfilled, (state, { payload }) => {
        const { channels, currentChannelId } = payload;
        state.currentChannelId = currentChannelId;
        channelsAdapter.setAll(state, channels);
      });
  },
});

export const { actions } = channelsSlice;
export const selectors = {
  ...channelsAdapter.getSelectors((state) => state.channels),
  selectCurrentChannelId: (state) => state.channels.currentChannelId,
};
export default channelsSlice.reducer;
