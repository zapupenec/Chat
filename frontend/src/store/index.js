/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';

import { channelsReducer, messagesReducer } from './slices';

export const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
