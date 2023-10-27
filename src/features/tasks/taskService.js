import axios from "axios";

const API_URL = "/api/task/";

// Create new task
const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  return response.data;
};

const updateTask = async (taskData, taskId) => {
  const response = await axios.put(API_URL + taskData.id, {
    title: taskData.title,
    description: taskData.description,
  });
  return response.data;
};

// Get All tasks
const getAllTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Search for a task
const searchTasks = async (searchValue) => {
  const response = await axios.get(API_URL + `search/${searchValue}`);
  return response.data;
};

// Get a task
const getOneTask = async (taskId) => {
  const response = await axios.get(API_URL + `getTaskbyId/${taskId}`);
  console.log("last" + taskId);
  return response.data;
};

// Delete task
const deleteTask = async (taskId) => {
  const response = await axios.delete(API_URL + taskId);
  return response.data;
};

const taskService = {
  createTask,
  getAllTasks,
  deleteTask,
  searchTasks,
  updateTask,
  getOneTask,
};

export default taskService;
