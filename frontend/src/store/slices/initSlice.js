/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { routes } from '../../routes';

export const fetchData = createAsyncThunk(
  'init/fetchData',
  async (authHeader, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(routes.api.data, { headers: authHeader });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const initialState = {
  loadingStatus: 'loading',
};

const channelsSlice = createSlice({
  name: 'init',
  initialState,
  reducers: {
    setError: (state, { payload }) => { state.error = payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchData.fulfilled, (state) => {
        state.loadingStatus = 'idle';
      })
      .addCase(fetchData.rejected, (state) => {
        state.loadingStatus = 'failed';
      });
  },
});

const selectLoadingStatus = (state) => state.init.loadingStatus;
const selectError = (state) => state.init.error;

export const { actions } = channelsSlice;
export const selectors = {
  selectLoadingStatus,
  selectError,
};
export default channelsSlice.reducer;
