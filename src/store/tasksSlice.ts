import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Parse } from '../utils/parseConfig';
import type { Task, FilterStatus, Priority, PriorityFilter } from '../types';

interface TasksState {
  tasks: Task[];
  filter: FilterStatus;
  priorityFilter: PriorityFilter;
  loading: boolean;
  error: string | null;
}

const serializeTask = (obj: Parse.Object): Task => ({
  objectId: obj.id,
  title: obj.get('title') as string,
  completed: (obj.get('completed') as boolean) ?? false,
  priority: (obj.get('priority') as Priority) ?? 'medium',
  category: (obj.get('category') as string) ?? '',
  createdAt: obj.createdAt?.toISOString() ?? new Date().toISOString(),
});

export const fetchTasks = createAsyncThunk(
  'tasks/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const query = new Parse.Query('Task');
      const currentUser = Parse.User.current();
      if (currentUser) query.equalTo('user', currentUser);
      query.descending('createdAt');
      const results = await query.find();
      return results.map(serializeTask);
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Failed to fetch tasks');
    }
  }
);

export const addTask = createAsyncThunk(
  'tasks/add',
  async (
    { title, priority, category }: { title: string; priority: Priority; category: string },
    { rejectWithValue }
  ) => {
    try {
      const task = new Parse.Object('Task');
      task.set('title', title);
      task.set('completed', false);
      task.set('priority', priority);
      task.set('category', category);
      const currentUser = Parse.User.current();
      task.set('user', currentUser);
      if (currentUser) {
        const acl = new Parse.ACL(currentUser);
        task.setACL(acl);
      }
      const saved = await task.save();
      return serializeTask(saved);
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Failed to add task');
    }
  }
);

export const toggleTask = createAsyncThunk(
  'tasks/toggle',
  async (
    { objectId, completed }: { objectId: string; completed: boolean },
    { rejectWithValue }
  ) => {
    try {
      const query = new Parse.Query('Task');
      const task = await query.get(objectId);
      task.set('completed', !completed);
      await task.save();
      return { objectId, completed: !completed };
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Failed to update task');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (objectId: string, { rejectWithValue }) => {
    try {
      const query = new Parse.Query('Task');
      const task = await query.get(objectId);
      await task.destroy();
      return objectId;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Failed to delete task');
    }
  }
);

export const updateTaskTitle = createAsyncThunk(
  'tasks/updateTitle',
  async (
    { objectId, title }: { objectId: string; title: string },
    { rejectWithValue }
  ) => {
    try {
      const query = new Parse.Query('Task');
      const task = await query.get(objectId);
      task.set('title', title);
      await task.save();
      return { objectId, title };
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Failed to update task');
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    filter: 'all',
    priorityFilter: 'all',
    loading: false,
    error: null,
  } as TasksState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterStatus>) => {
      state.filter = action.payload;
    },
    setPriorityFilter: (state, action: PayloadAction<PriorityFilter>) => {
      state.priorityFilter = action.payload;
    },
    reorderTasks: (
      state,
      action: PayloadAction<{ activeId: string; overId: string }>
    ) => {
      const { activeId, overId } = action.payload;
      const oldIndex = state.tasks.findIndex((t) => t.objectId === activeId);
      const newIndex = state.tasks.findIndex((t) => t.objectId === overId);
      if (oldIndex !== -1 && newIndex !== -1) {
        const tasks = [...state.tasks];
        tasks.splice(newIndex, 0, tasks.splice(oldIndex, 1)[0]);
        state.tasks = tasks;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        const task = state.tasks.find((t) => t.objectId === action.payload.objectId);
        if (task) task.completed = action.payload.completed;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.objectId !== action.payload);
      })
      .addCase(updateTaskTitle.fulfilled, (state, action) => {
        const task = state.tasks.find((t) => t.objectId === action.payload.objectId);
        if (task) task.title = action.payload.title;
      });
  },
});

export const { setFilter, setPriorityFilter, reorderTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
