import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "./features/playerSlice";

import { shazamCoreApi } from "./services/shazamCore";

export const store = configureStore({
  // this whole section is what you do for every redux toolkit application , it is a boilerplate code found in their documentation
  // https://redux-toolkit.js.org/rtk-query/api/created-api/redux-integration#middleware
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shazamCoreApi.middleware),
});
