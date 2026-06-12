import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTask, deleteTask, updateTaskTitle } from '../store/tasksSlice';
import type { AppDispatch } from '../store';
import type { Task } from '../types';
import { FiTrash2, FiEdit2, FiCheck, FiX } from 'react-icons/fi';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const priorityConfig = {
  high:   { dot: 'bg-red-500',      badge: 'bg-red-500/10 text-red-400 ring-1 ring-red-500/20',           label: 'High' },
  medium: { dot: 'bg-amber-400',    badge: 'bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/20',       label: 'Med'  },
  low:    { dot: 'bg-emerald-500',  badge: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20', label: 'Low'  },
};

const TaskItem = ({ task }: { task: Task }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const config = priorityConfig[task.priority];

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.objectId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
    zIndex: isDragging ? 50 : 'auto',
  } as React.CSSProperties;

  const handleSaveEdit = async () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== task.title) {
      await dispatch(updateTaskTitle({ objectId: task.objectId, title: trimmed }));
    }
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setEditValue(task.title);
    setEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-3 bg-white dark:bg-gray-900 rounded-xl border p-3.5 transition-all duration-150 ${
        isDragging
          ? 'border-fuchsia-500/40 shadow-lg shadow-fuchsia-500/10 ring-1 ring-fuchsia-500/20'
          : 'border-gray-100 dark:border-gray-800 hover:border-fuchsia-500/30 dark:hover:border-fuchsia-500/20 hover:shadow-sm'
      } ${task.completed ? 'opacity-50' : ''}`}
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        tabIndex={-1}
        className="flex-shrink-0 cursor-grab active:cursor-grabbing text-gray-300 dark:text-gray-700 hover:text-fuchsia-400 dark:hover:text-fuchsia-500 opacity-0 group-hover:opacity-100 transition-all touch-none select-none"
        aria-label="Drag to reorder"
      >
        <svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor">
          <circle cx="3" cy="2"  r="1.5" />
          <circle cx="7" cy="2"  r="1.5" />
          <circle cx="3" cy="7"  r="1.5" />
          <circle cx="7" cy="7"  r="1.5" />
          <circle cx="3" cy="12" r="1.5" />
          <circle cx="7" cy="12" r="1.5" />
        </svg>
      </button>

      {/* Checkbox */}
      <button
        onClick={() =>
          void dispatch(toggleTask({ objectId: task.objectId, completed: task.completed }))
        }
        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
          task.completed
            ? 'bg-gradient-to-br from-fuchsia-500 to-violet-600 border-transparent shadow-sm shadow-fuchsia-500/30'
            : 'border-gray-300 dark:border-gray-700 hover:border-fuchsia-400 dark:hover:border-fuchsia-500'
        }`}
      >
        {task.completed && (
          <FiCheck className="text-white" strokeWidth={3} size={10} />
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <div className="flex items-center gap-2">
            <input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') void handleSaveEdit();
                if (e.key === 'Escape') handleCancelEdit();
              }}
              autoFocus
              className="flex-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-fuchsia-500/40 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/25"
            />
            <button
              onClick={() => void handleSaveEdit()}
              className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
            >
              <FiCheck size={15} strokeWidth={2.5} />
            </button>
            <button
              onClick={handleCancelEdit}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <FiX size={15} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-sm font-medium ${
                task.completed
                  ? 'line-through text-gray-400 dark:text-gray-600'
                  : 'text-gray-800 dark:text-gray-100'
              }`}
            >
              {task.title}
            </span>
            {task.category && (
              <span className="text-xs bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20 px-2 py-0.5 rounded-full">
                {task.category}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Priority badge */}
      <div
        className={`flex items-center gap-1.5 flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${config.badge}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
        {config.label}
      </div>

      {/* Actions */}
      {!editing && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={() => setEditing(true)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-fuchsia-400 hover:bg-fuchsia-500/10 transition-colors"
          >
            <FiEdit2 size={13} />
          </button>
          <button
            onClick={() => void dispatch(deleteTask(task.objectId))}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <FiTrash2 size={13} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
