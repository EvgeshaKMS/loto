import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createRandomArray } from 'utils/createRandomArray';
import { TTicketState } from 'types/general';

const initialState: TTicketState = {
  isSelectedAll: false,
  isResultCalculated: false,
  isResultSend: null,
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
      }
    },
    onSecondFieldSelect(state, action: PayloadAction<number>) {
      if (
        state.selectCounter.second < 1 ||
        (state.selectCounter.second === 1 && state.secondField[action.payload].isSelected)
      ) {
        state.secondField[action.payload].isSelected =
          !state.secondField[action.payload].isSelected;
      }
    },
    onCounterChange(state) {
      state.selectCounter.first = state.firstField.filter((item) => item.isSelected).length;

      state.selectCounter.second = state.secondField.filter((item) => item.isSelected).length;

      state.isSelectedAll = state.selectCounter.first === 8 && state.selectCounter.second === 1;
    },
    selectRandomNumbers(state) {
      let randomArray = createRandomArray(19, 8);
      state.firstField.forEach((item, index) => {
        if (randomArray.includes(item.number)) {
          state.firstField[index].isSelected = true;
        }
      });

      randomArray = createRandomArray(2, 1);
      state.secondField.forEach((item, index) => {
        if (randomArray.includes(item.number)) {
          state.secondField[index].isSelected = true;
        }
      });
    },
    clearField(state) {
      state.firstField = Array.from(Array(19), (_, i) => {
        return { number: i + 1, isSelected: false };
      });
      state.secondField = Array.from(Array(2), (_, i) => {
        return { number: i + 1, isSelected: false };
      });
    },
    calculateResult(state) {
      if (state.isSelectedAll && !state.isResultCalculated) {
        state.result.selectedNumber.firstField = state.firstField
          .filter((item) => item.isSelected)
          .map((item) => item.number);
        state.result.selectedNumber.secondField = state.secondField
          .filter((item) => item.isSelected)
          .map((item) => item.number);

        let randomArray = createRandomArray(19, 8);
        let matchingNumbersCounter1 = 0;

        state.firstField.forEach((item) => {
          if (randomArray.includes(item.number) && item.isSelected) {
            matchingNumbersCounter1++;
          }
        });

        randomArray = createRandomArray(2, 1);
        let matchingNumbersCounter2 = 0;

        state.secondField.forEach((item) => {
          if (randomArray.includes(item.number) && item.isSelected) matchingNumbersCounter2++;
        });

        state.result.isTicketWon =
          matchingNumbersCounter1 >= 4 ||
          (matchingNumbersCounter1 >= 3 && matchingNumbersCounter2 >= 1);

        state.isResultCalculated = true;
      }
    },
  },
});

export const {
  onFirstFieldSelect,
  onSecondFieldSelect,
  onCounterChange,
  calculateResult,
  selectRandomNumbers,
  clearField,
} = ticketSlice.actions;

export default ticketSlice.reducer;
