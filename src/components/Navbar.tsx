import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/authSlice';
import { toggleTheme } from '../store/themeSlice';
import type { AppDispatch, RootState } from '../store';
import { FiLogOut, FiSun, FiMoon, FiZap } from 'react-icons/fi';

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { isDark } = useSelector((state: RootState) => state.theme);

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : 'U';

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center shadow-md shadow-fuchsia-500/25">
            <FiZap className="text-white" size={15} strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
            TaskIn
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <FiSun size={17} /> : <FiMoon size={17} />}
          </button>

          <div className="w-px h-5 bg-gray-200 dark:bg-gray-800 mx-1" />

          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold shadow-sm shadow-fuchsia-500/25">
            {initials}
          </div>

          <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block font-medium max-w-[120px] truncate">
            {user?.username}
          </span>

          {/* Logout */}
          <button
            onClick={() => void dispatch(logoutUser())}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FiLogOut size={15} />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
