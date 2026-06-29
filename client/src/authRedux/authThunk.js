import { createAsyncThunk } from "@reduxjs/toolkit";
import { regUser, logInUser, updUser } from "../api/api";

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (newUser, thunkAPI) => {
    try {
      const user = await regUser(newUser);
      return user;
    } catch (error) {
      console.log("CREATE USER ERROR:", error);
      console.log("BACKEND RESPONSE:", error.response?.data);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Помилка реєстрації",
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const data = await logInUser(userData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("error_login_user");
    }
  },
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token || localStorage.getItem("token");

      const updatedUser = await updUser(userData, token);
      return updatedUser;
    } catch (error) {
      error.response?.data?.message || "Помилка оновлення користувача";
    }
  },
);
