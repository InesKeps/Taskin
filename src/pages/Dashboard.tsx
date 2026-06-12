import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, reorderTasks } from '../store/tasksSlice';
import type { AppDispatch, RootState } from '../store';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import FilterBar from '../components/FilterBar';
import TaskItem from '../components/TaskItem';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, filter, priorityFilter, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );
  const [search, setSearch] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    void dispatch(fetchTasks());
  }, [dispatch]);

  const filtered = tasks.filter((task) => {
    const statusOk =
      filter === 'all' ||
      (filter === 'active' && !task.completed) ||
      (filter === 'completed' && task.completed);
    const priorityOk = priorityFilter === 'all' || task.priority === priorityFilter;
    const q = search.toLowerCase();
    const searchOk =
      !q ||
      task.title.toLowerCase().includes(q) ||
      task.category.toLowerCase().includes(q);
    return statusOk && priorityOk && searchOk;
  });

  const total = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = total - completedCount;
  const progress = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      dispatch(
        reorderTasks({ activeId: active.id as string, overId: over.id as string })
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Tasks</h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
            {total === 0
              ? 'Start by adding your first task'
              : completedCount === total
              ? 'All tasks completed! 🎉'
              : `${activeCount} task${activeCount !== 1 ? 's' : ''} remaining`}
          </p>

          {/* Progress bar */}
          {total > 0 && (
            <div className="mt-5 space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 dark:text-gray-500">Progress</span>
                <span className="font-semibold text-fuchsia-500">{progress}%</span>
              </div>
              <div className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-fuchsia-500 to-violet-600 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Stats cards */}
        {total > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { label: 'Total',  value: total,          color: 'text-gray-900 dark:text-white' },
              { label: 'Active', value: activeCount,    color: 'text-fuchsia-500' },
              { label: 'Done',   value: completedCount, color: 'text-violet-500' },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 text-center hover:border-fuchsia-500/20 dark:hover:border-fuchsia-500/20 transition-colors"
              >
                <p className={`text-2xl font-bold tabular-nums ${color}`}>{value}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        )}

        <TaskForm />
        <FilterBar search={search} onSearch={setSearch} />

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 text-red-400 text-sm px-4 py-3 rounded-xl border border-red-500/20 mb-4">
            {error}
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-14 bg-gray-100 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 animate-pulse"
                style={{ opacity: 1 - i * 0.2 }}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-fuchsia-500/10 dark:bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center mb-4">
              <span className="text-2xl">{tasks.length === 0 ? '✨' : '🔍'}</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              {tasks.length === 0 ? 'No tasks yet' : 'No tasks match your filters'}
            </p>
            <p className="text-gray-400 dark:text-gray-600 text-xs mt-1">
              {tasks.length === 0 ? 'Add your first task above' : 'Try clearing the search or filters'}
            </p>
          </div>
        )}

        {/* Task list */}
        {!loading && filtered.length > 0 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filtered.map((t) => t.objectId)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {filtered.map((task) => (
                  <TaskItem key={task.objectId} task={task} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        {/* Drag hint */}
        {!loading && filtered.length > 1 && (
          <p className="text-center text-xs text-gray-300 dark:text-gray-700 mt-6">
            ⠿ Drag tasks to reorder
          </p>
        )}

      </main>
    </div>
  );
};

export default Dashboard;
