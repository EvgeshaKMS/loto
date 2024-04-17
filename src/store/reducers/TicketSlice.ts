import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTicketState } from '../../types/general';

const initialState: TTicketState = {
  firstField: Array.from(Array(19), (_, i) => {
    return { number: i + 1, isSelected: false };
  }),
  secondField: Array.from(Array(2), (_, i) => {
    return { number: i + 1, isSelected: false };
  }),
  selectCounter: {
    first: 0,
    second: 0,
  },
  isSelectedAll: false,
  result: {
    selectedNumber: {
      firstField: [],
      secondField: [],
    },
    isTicketWon: false,
  },
};

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    onFirstFieldSelect(state, action: PayloadAction<number>) {
      if (
        state.selectCounter.first < 8 ||
        (state.selectCounter.first === 8 && state.firstField[action.payload].isSelected)
      ) {
        state.firstField[action.payload].isSelected = !state.firstField[action.payload].isSelected;

        state.selectCounter.first = state.firstField.filter((item) => item.isSelected).length;
      }
    },
    onSecondFieldSelect(state, action: PayloadAction<number>) {
      if (
        state.selectCounter.second < 1 ||
        (state.selectCounter.second === 1 && state.secondField[action.payload].isSelected)
      ) {
        state.secondField[action.payload].isSelected =
          !state.secondField[action.payload].isSelected;

        state.selectCounter.second = state.secondField.filter((item) => item.isSelected).length;
      }
    },
    onCounterChange(state) {
      state.isSelectedAll = state.selectCounter.first === 8 && state.selectCounter.second === 1;
    },
    onSubmit(state) {
      if (state.selectCounter.first === 8 && state.selectCounter.second === 1) {
        state.result.selectedNumber.firstField = state.firstField
          .filter((item) => item.isSelected)
          .map((item) => item.number);
        state.result.selectedNumber.secondField = state.secondField
          .filter((item) => item.isSelected)
          .map((item) => item.number);

        // todo: add logic on comparing numbers
      }
    },
  },
});

export const { onFirstFieldSelect, onSecondFieldSelect, onCounterChange, onSubmit } =
  ticketSlice.actions;

export default ticketSlice.reducer;
