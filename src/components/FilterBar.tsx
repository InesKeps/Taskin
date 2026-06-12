import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setPriorityFilter } from '../store/tasksSlice';
import type { AppDispatch, RootState } from '../store';
import type { FilterStatus, PriorityFilter } from '../types';
import { FiSearch, FiX } from 'react-icons/fi';

interface Props {
  search: string;
  onSearch: (v: string) => void;
}

const STATUSES: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Done' },
];

const FilterBar = ({ search, onSearch }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { filter, priorityFilter, tasks } = useSelector((state: RootState) => state.tasks);

  const counts: Record<FilterStatus, number> = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div className="space-y-3 mb-5">
      {/* Search bar */}
      <div className="relative">
        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600 pointer-events-none"
          size={15}
        />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search tasks…"
          className="w-full pl-9 pr-9 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 focus:border-fuchsia-500/50 transition-all"
        />
        {search && (
          <button
            onClick={() => onSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <FiX size={14} />
          </button>
        )}
      </div>

      {/* Filters row */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Status tabs */}
        <div className="flex bg-gray-100 dark:bg-gray-900 rounded-xl p-1 border border-gray-200 dark:border-gray-800">
          {STATUSES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => dispatch(setFilter(value))}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                filter === value
                  ? 'bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {label}
              <span
                className={`ml-1.5 text-xs tabular-nums ${
                  filter === value ? 'text-fuchsia-200' : 'text-gray-400 dark:text-gray-600'
                }`}
              >
                {counts[value]}
              </span>
            </button>
          ))}
        </div>

        {/* Priority filter */}
        <select
          value={priorityFilter}
          onChange={(e) => dispatch(setPriorityFilter(e.target.value as PriorityFilter))}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 cursor-pointer"
        >
          <option value="all">All priorities</option>
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
