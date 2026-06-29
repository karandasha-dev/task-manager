import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTasks, addTask, editTask, delTask } from "../api/api";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, thunkAPI) => {
    try {
      const data = await getTasks();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("error_fetch_tasks");
    }
  },
);

export const createTasks = createAsyncThunk(
  "tasks/createTasks",
  async (newTask, thunkAPI) => {
    try {
      const data = await addTask(newTask);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("error_create_tasks");
    }
  },
);

export const updateTasks = createAsyncThunk(
  "tasks/updateTasks",
  async ({ id, updatedTask }, thunkAPI) => {
    try {
      const taskData = {
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.status,
        priority: updatedTask.priority,
        deadline: updatedTask.deadline,
      };

      const data = await editTask(id, taskData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("error_edit_tasks");
    }
  },
);

export const deleteTasks = createAsyncThunk(
  "tasks/deleteTasks",
  async (id, thunkAPI) => {
    try {
      await delTask(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue("error_edit_tasks");
    }
  },
);
