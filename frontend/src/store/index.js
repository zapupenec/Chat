/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';

import { channelsReducer, messagesReducer, modalsReducer } from './slices';

export const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
  },
});
