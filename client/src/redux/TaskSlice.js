import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get('http://localhost:3004/tasks');
//   const response = await axios.get('http://localhost:5000/getAllTasks');
  return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const response = await axios.post('http://localhost:3004/tasks', task);
//   const response = await axios.post('http://localhost:5000/addTask', task);
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ task, id }, { dispatch, getState }) => {
  const response = await axios.put(`http://localhost:3004/tasks/${id}`, task);
//   const response = await axios.put(`http://localhost:5000/updateTasks/${task.id}`, task);
  return response.data;
});

export const updateState = createAsyncThunk('tasks/updateState', async (taskId) => {
    const response = await axios.put(`http://localhost:3004/tasks/${taskId}`);
  //   const response = await axios.put(`http://localhost:5000/updateStatus/${task.id}`, task);
    return response.data;
  });

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
  await axios.delete(`http://localhost:3004/tasks/${taskId}`);
//   await axios.put(`http://localhost:5000/removeTask/${taskId}`);
  return taskId;
});

export const fetchCompletedTasks = createAsyncThunk('tasks/fetchCompletedTasks', async () => {
    const response = await axios.get('http://localhost:3004/tasks');
    const tasks = response.data;
    const completedTasks = tasks.filter((task) => task.completed === true);
    return completedTasks;
  });

  export const fetchPendingTasks = createAsyncThunk('tasks/fetchPendingTasks', async () => {
    const response = await axios.get('http://localhost:3004/tasks');
    const tasks = response.data;
    const pendingTasks = tasks.filter((task) => task.completed === false);
    return pendingTasks;
  });

  export const fetchFilteredTasks = createAsyncThunk(
    'tasks/fetchFilteredTasks',
    async (searchQuery, { getState }) => {
      const tasks = getState().tasks.tasks; // Get all tasks from the store
  
      // Filter tasks based on the searchQuery
      const filteredTasks = tasks.filter((task) => {
        // Customize the filtering logic based on your requirements.
        return task.title.toLowerCase().includes(searchQuery.toLowerCase());
      });
  
      return filteredTasks;
    }
  );

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
        state.completedTasks = action.payload.filter((task) => task.completed === true);
        state.pendingTasks = action.payload.filter((task) => task.completed === false);
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
