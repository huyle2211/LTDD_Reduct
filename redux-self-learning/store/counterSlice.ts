import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
  step: number;
}

const initialState: CounterState = {
  value: 0,
  step: 1,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += state.step;
    },

    decrement: (state) => {
      state.value -= state.step;
    },

    reset: (state) => {
      state.value = 0;
    },

    incrementByFive: (state) => {
      state.value += 5;
    },
  },
});

export const {
  increment,
  decrement,
  reset,
  incrementByFive,
} = counterSlice.actions;

export default counterSlice.reducer;
