import { configureStore } from '@reduxjs/toolkit';
import { channelsReducer, messagesReducer } from './slices';

export const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
