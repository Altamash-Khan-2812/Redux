import { createSlice } from "@reduxjs/toolkit";

const habitSlice = createSlice({
  name: "habits",
  initialState: [],
  reducers: {},
});

export const { addHabit } = habitSlice.actions;

export default habitSlice.reducer;
