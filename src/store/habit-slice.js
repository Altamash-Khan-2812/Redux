import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchHabits = createAsyncThunk("habits/fetchHabits", async () => {
  await new Promise((res) => setTimeout(res, 1000));

  const mockHabits = [
    {
      id: 1,
      name: "Read",
      frequency: "Daily",
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: "Exercise",
      frequency: "Daily",
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
  ];

  return mockHabits;
});
const habitSlice = createSlice({
  name: "habits",
  initialState: {
    habits: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addHabit: (state, action) => {
      const newHabit = {
        id: new Date().toString(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completedDates: [],
      };
      state.habits.push(newHabit);
    },

    toggleHabit: (state, action) => {
      const habit = state.habits.find((h) => h.id === action.payload.id);

      if (habit) {
        const index = habit.completedDates.indexOf(action.payload.date);

        if (index > -1) {
          habit.completedDates.splice(index, 1);
        } else {
          habit.completedDates.push(action.payload.date);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch habits";
      });
  },
});

export const { addHabit, toggleHabit } = habitSlice.actions;

export default habitSlice.reducer;
