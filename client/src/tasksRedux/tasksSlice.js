import { fetchTasks, createTasks, updateTasks, deleteTasks } from "./taskThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  list: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.list = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.list = [action.payload, ...state.list];
    });
    builder.addCase(createTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.list = state.list.map((task) =>
        task.id === action.payload.id ? action.payload : task,
      );
    });
    builder.addCase(updateTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.list = state.list.filter((task) => task.id !== action.payload);
    });
    builder.addCase(deleteTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default tasksSlice.reducer;
