/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShowen: false,
  type: null,
  channelId: null,
};

const messagesSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      const { type, channelId } = payload;
      state.isShowen = true;
      state.type = type;
      state.channelId = channelId;
    },
    closeModal: (state) => {
      state.isShowen = false;
      state.type = null;
      state.channelId = null;
    },
  },
});

const selectIsShowen = (state) => state.modals.isShowen;
const selectType = (state) => state.modals.type;
const selectChannelId = (state) => state.modals.channelId;

export const { actions } = messagesSlice;
export const selectors = {
  selectIsShowen,
  selectType,
  selectChannelId,
};
export default messagesSlice.reducer;
