import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state, action) => {
      if(action.payload) {
        state.value +=action.payload;
      } else {
        state.value +=1;
      }
    },
    decrement: (state, action) => {
       if(action.payload) {
         state.value -=action.payload;
        } else {
        state.value -=1;
      }
    }
  },
  selectors: {
    getDoubleCounter: (state) => {
      return state.value * 2
    },
    getCounter: (state, value) => {
      return state.value * value
    }
  }
})

export const {increment, decrement} = counterSlice.actions;
export const {getDoubleCounter, getCounter} = counterSlice.selectors;

export default counterSlice;