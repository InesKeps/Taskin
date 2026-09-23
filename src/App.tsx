import { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAuth } from './store/authSlice';
import type { AppDispatch, RootState } from './store';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { initialized } = useSelector((state: RootState) => state.auth);
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  useEffect(() => {
    void dispatch(initializeAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  if (!initialized) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center shadow-lg shadow-fuchsia-500/30 animate-pulse">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <div className="h-1 w-24 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-gradient-to-r from-fuchsia-500 to-violet-600 rounded-full animate-ping" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
