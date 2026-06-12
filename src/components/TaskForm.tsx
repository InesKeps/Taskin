import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addTask } from '../store/tasksSlice';
import type { AppDispatch, RootState } from '../store';
import type { Priority } from '../types';
import { FiPlus } from 'react-icons/fi';

const PRIORITIES: { value: Priority; label: string; dot: string }[] = [
  { value: 'high',   label: 'High',   dot: 'bg-red-500' },
  { value: 'medium', label: 'Medium', dot: 'bg-amber-400' },
  { value: 'low',    label: 'Low',    dot: 'bg-emerald-500' },
];

const TaskForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.tasks);

  const formik = useFormik({
    initialValues: { title: '', priority: 'medium' as Priority, category: '' },
    validationSchema: Yup.object({
      title: Yup.string().min(1).max(200).required('Task title is required'),
      priority: Yup.string().oneOf(['high', 'medium', 'low']).required(),
      category: Yup.string().max(50),
    }),
    onSubmit: async (values, { resetForm }) => {
      await dispatch(addTask(values));
      resetForm();
    },
  });

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 mb-5 shadow-sm">
      <form onSubmit={(e) => { e.preventDefault(); void formik.handleSubmit(); }}>
        {/* Title row */}
        <div className="flex items-center gap-3 mb-3">
          <input
            {...formik.getFieldProps('title')}
            placeholder="Add a new task…"
            className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !formik.values.title.trim()}
            className="w-8 h-8 flex-shrink-0 rounded-lg bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center text-white shadow-md shadow-fuchsia-500/25 hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FiPlus size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Options row */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
          {/* Priority buttons */}
          <div className="flex gap-1">
            {PRIORITIES.map(({ value, label, dot }) => (
              <button
                key={value}
                type="button"
                onClick={() => void formik.setFieldValue('priority', value)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  formik.values.priority === value
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-gray-300 dark:ring-gray-700'
                    : 'text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-400'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${dot}`} />
                {label}
              </button>
            ))}
          </div>

          {/* Category */}
          <input
            {...formik.getFieldProps('category')}
            placeholder="Category"
            className="ml-auto bg-transparent text-xs text-right text-gray-400 dark:text-gray-600 placeholder-gray-300 dark:placeholder-gray-700 focus:outline-none focus:text-gray-700 dark:focus:text-gray-300 max-w-[110px] transition-colors"
          />
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
