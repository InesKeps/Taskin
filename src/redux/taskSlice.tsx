// src/redux/taskSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '../types/task';

const initialState: Task[] = [];

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    }
  }
});

export const { addTask } = taskSlice.actions;
// export default taskSlice.reducer;
export default taskSlice;
