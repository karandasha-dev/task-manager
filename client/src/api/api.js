import axios from "axios";

const tasksURL = "http://localhost:5000/api/tasks";
const authURL = "http://localhost:5000/api/auth";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getTasks = async () => {
  const response = await axios.get(tasksURL, getAuthHeaders());
  return response.data;
};

export const addTask = async (newTask) => {
  const response = await axios.post(tasksURL, newTask, getAuthHeaders());
  return response.data;
};

export const editTask = async (id, updatedTask) => {
  const response = await axios.patch(
    `${tasksURL}/${id}`,
    updatedTask,
    getAuthHeaders(),
  );
  return response.data;
};

export const delTask = async (id) => {
  const response = await axios.delete(`${tasksURL}/${id}`, getAuthHeaders());
  return response.data;
};

export const regUser = async (newUser) => {
  const formData = new FormData();

  formData.append("first_name", newUser.first_name);
  formData.append("last_name", newUser.last_name);
  formData.append("email", newUser.email);
  formData.append("password", newUser.password);

  if (newUser.avatar) {
    formData.append("avatar", newUser.avatar);
  }

  const response = await axios.post(`${authURL}/register`, formData);
  return response.data;
};

export const logInUser = async (userData) => {
  const response = await axios.post(`${authURL}/login`, userData);
  return response.data;
};

export const getMe = async () => {
  const response = await axios.get(`${authURL}/me`, getAuthHeaders());
  return response.data;
};

export const updateAvatar = async (avatarFile) => {
  const formData = new FormData();

  formData.append("avatar", avatarFile);

  const response = await axios.patch(
    `${authURL}/avatar`,
    formData,
    getAuthHeaders(),
  );

  return response.data;
};

export const updUser = async (userData, token) => {
  const response = await axios.patch(
    `${authURL}/me`,
    userData,
    getAuthHeaders(),
  );

  return response.data;
};
