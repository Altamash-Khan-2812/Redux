import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "./habit-slice";

export default configureStore({
  reducer: {
    habits: habitReducer,
  },
});
