import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../store/authSlice';
import type { AppDispatch, RootState } from '../store';
import { FiZap, FiUser, FiMail, FiLock } from 'react-icons/fi';

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) void navigate('/');
  }, [user, navigate]);

  const formik = useFormik({
    initialValues: { username: '', email: '', password: '', confirmPassword: '' },
    validationSchema: Yup.object({
      username: Yup.string().min(3, 'At least 3 characters').max(30).required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6, 'At least 6 characters').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match')
        .required('Required'),
    }),
    onSubmit: ({ username, email, password }) => {
      void dispatch(registerUser({ username, email, password }));
    },
  });

  const inputClass =
    'w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 focus:border-fuchsia-500/50 transition-all';
  const iconClass =
    'absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600 pointer-events-none';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-500/8 dark:bg-violet-500/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-20 w-64 h-64 bg-fuchsia-500/8 dark:bg-fuchsia-500/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-sm">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-xl shadow-black/5 dark:shadow-black/40">

          {/* Brand */}
          <div className="flex items-center justify-center gap-2.5 mb-7">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center shadow-lg shadow-fuchsia-500/30">
              <FiZap className="text-white" size={18} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
              TaskIn
            </span>
          </div>

          <h1 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
            Create your account
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 text-center mt-1 mb-6">
            Free forever, no credit card
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-5">
              {error}
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); void formik.handleSubmit(); }} className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Username
              </label>
              <div className="relative">
                <FiUser className={iconClass} size={15} />
                <input
                  {...formik.getFieldProps('username')}
                  type="text"
                  placeholder="yourname"
                  className={inputClass}
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-400 text-xs mt-1">{formik.errors.username}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Email
              </label>
              <div className="relative">
                <FiMail className={iconClass} size={15} />
                <input
                  {...formik.getFieldProps('email')}
                  type="email"
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-400 text-xs mt-1">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <FiLock className={iconClass} size={15} />
                <input
                  {...formik.getFieldProps('password')}
                  type="password"
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-400 text-xs mt-1">{formik.errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Confirm password
              </label>
              <div className="relative">
                <FiLock className={iconClass} size={15} />
                <input
                  {...formik.getFieldProps('confirmPassword')}
                  type="password"
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">{formik.errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-fuchsia-500 to-violet-600 hover:from-fuchsia-600 hover:to-violet-700 active:scale-[0.98] transition-all shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-6">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-fuchsia-500 hover:text-fuchsia-400 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
