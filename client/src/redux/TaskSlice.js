import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get('http://localhost:5000/getAllTask');
  return response.data;
});

export const fetchTask = createAsyncThunk('tasks/fetchTask', async (id) => {
      const response = await axios.get(`http://localhost:5000/getTaskById/${id}`);
      return response.data;
    });

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const response = await axios.post('http://localhost:5000/addTask', task);
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ task, id }, { dispatch, getState }) => {
  const response = await axios.put(`http://localhost:5000/updateTasks/${id}`, task);
  return response.data;
});

export const updateState = createAsyncThunk('tasks/updateState', async ({ taskId, status }, { dispatch, getState }) => {
    const response = await axios.put(`http://localhost:5000/updateStatus/${taskId}/${!status}`);
    return response.data;
  });
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
  await axios.put(`http://localhost:5000/removeTask/${taskId}`);
  return taskId;
});

export const fetchCompletedTasks = createAsyncThunk('tasks/fetchCompletedTasks', async () => {
    const response = await axios.get('http://localhost:5000/getAllTask');
    const tasks = response.data;
    const completedTasks = tasks.filter((task) => task.status === true);
    return completedTasks;
  });

  export const fetchPendingTasks = createAsyncThunk('tasks/fetchPendingTasks', async () => {
    const response = await axios.get('http://localhost:5000/getAllTask');
    const tasks = response.data;
    const pendingTasks = tasks.filter((task) => task.status === false);
    return pendingTasks;
  });

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [],
    completedTasks: [],
    pendingTasks: [],
    filteredTasks: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
        state.completedTasks = action.payload.filter((task) => task.status === true);
        state.pendingTasks = action.payload.filter((task) => task.status === false);
        state.filteredTasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Similarly, add extraReducers for addTask, updateTask, and deleteTask.
  },
});

export default tasksSlice.reducer;
