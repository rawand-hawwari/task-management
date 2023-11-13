import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './redux/TaskSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;