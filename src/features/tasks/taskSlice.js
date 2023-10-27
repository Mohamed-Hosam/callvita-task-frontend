import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "./taskService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  allTasks: [],
  taskById: "",
};

// Create new task action
export const createTask = createAsyncThunk(
  "task/create",
  async (taskData, thunkAPI) => {
    try {
      return await taskService.createTask(taskData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update task action
export const updateTask = createAsyncThunk(
  "task/update",
  async (taskData, thunkAPI) => {
    try {
      return await taskService.updateTask(taskData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get All tasks in DB
export const getAllTasks = createAsyncThunk(
  "tasks/getAll",
  async (_, thunkAPI) => {
    try {
      return await taskService.getAllTasks();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Search for tasks in DB
export const searchTasks = createAsyncThunk(
  "tasks/searhTasks",
  async (searchValue, thunkAPI) => {
    try {
      return await taskService.searchTasks(searchValue);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get one task from DB
export const getOneTask = createAsyncThunk(
  "tasks/getOneTask",
  async (taskId, thunkAPI) => {
    try {
      return await taskService.getOneTask(taskId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id, thunkAPI) => {
    try {
      return await taskService.deleteTask(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allTasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allTasks = state.allTasks.filter(
          (task) => task._id !== action.payload.id
        );
        state.allTasks.push(action.payload);
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allTasks = state.allTasks.filter(
          (task) => task._id !== action.payload.id
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allTasks = action.payload;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(searchTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allTasks = action.payload;
      })
      .addCase(searchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOneTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.taskById = action.payload;
      })
      .addCase(getOneTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
