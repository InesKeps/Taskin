import { createSlice } from '@reduxjs/toolkit';

const getInitialDark = (): boolean => {
  try {
    const saved = localStorage.getItem('taskin-theme');
    return saved !== 'light'; // default: dark
  } catch {
    return true;
  }
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: { isDark: getInitialDark() },
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      try {
        localStorage.setItem('taskin-theme', state.isDark ? 'dark' : 'light');
      } catch { /* ignore */ }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
