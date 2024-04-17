import { configureStore } from '@reduxjs/toolkit';
import ticketSlice from './reducers/TicketSlice';

const store = configureStore({
  reducer: {
    ticket: ticketSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
