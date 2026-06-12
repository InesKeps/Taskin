import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Parse } from '../utils/parseConfig';
import type { CurrentUser } from '../types';

interface AuthState {
  user: CurrentUser | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const serializeUser = (user: Parse.User): CurrentUser => ({
  objectId: user.id,
  username: (user.get('displayName') as string | undefined) ?? user.getUsername() ?? '',
  email: user.getEmail() ?? '',
  sessionToken: user.getSessionToken() ?? '',
});

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // username = email (see registerUser)
      const user = await Parse.User.logIn(email, password);
      return serializeUser(user);
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    { username, email, password }: { username: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const user = new Parse.User();
      user.setUsername(email);          // email used as username for login
      user.set('displayName', username); // display name stored separately
      user.setEmail(email);
      user.setPassword(password);
      const result = await user.signUp();
      return serializeUser(result);
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Registration failed');
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await Parse.User.logOut();
});

export const initializeAuth = createAsyncThunk('auth/initialize', async () => {
  const user = Parse.User.current();
  return user ? serializeUser(user) : null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    initialized: false,
  } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.initialized = true;
      });
  },
});

export default authSlice.reducer;
