  import { configureStore } from "@reduxjs/toolkit";
  import tasksReducer from "../tasksRedux/tasksSlice";
  import authReducer from "../authRedux/authSlice";

  export const store = configureStore({
    reducer: {
      tasks: tasksReducer,
      auth: authReducer,
    },
  });
