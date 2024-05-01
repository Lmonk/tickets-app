import { configureStore } from '@reduxjs/toolkit';
import { ticketsReducer } from './tickets/ticketsSlice'

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
