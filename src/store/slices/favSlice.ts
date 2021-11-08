import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface StaredMovie {
  id: string;
  rating: number;
}

export interface CounterState {
  likes: string[];
  stars: StaredMovie[];
}

const initialState: CounterState = {
  likes: [],
  stars: [],
}

export const favSlice = createSlice({
  name: 'favMovie',
  initialState,
  reducers: {
    likeMovie: (state, action: PayloadAction<string>) => {
      if (state.likes.find(item => item === action.payload)) {
        return state
      } else {
        state.likes.push(action.payload)
        return state
      }
    },
    unlikeMovie: (state, action: PayloadAction<string>) => {
      const index = state.likes.findIndex(item => item === action.payload)
      if (index !== -1) {
        state.likes.splice(index, 1)
        return state;
      } else {
        return state
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { likeMovie, unlikeMovie } = favSlice.actions

export default favSlice.reducer