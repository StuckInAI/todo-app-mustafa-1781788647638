import { useState } from 'react';
import type { Todo } from '@/types';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const priorityStyles: Record<string, string> = {
  low: 'border-l-emerald-400',
  medium: 'border-l-amber-400',
  high: 'border-l-red-400',
};

const priorityBadge: Record<string, string> = {
  low: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-red-100 text-red-700',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleSave() {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    }
    setEditing(false);
  }

  function handleCancel() {
    setEditText(todo.text);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  }

  return (
    <li
      className={clsx(
        'bg-white border border-gray-100 rounded-2xl shadow-sm border-l-4 px-4 py-3 flex items-center gap-3 transition-all duration-150 group',
        priorityStyles[todo.priority]
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        aria-label="Toggle complete"
        className={clsx(
          'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-150',
          todo.completed
            ? 'bg-indigo-500 border-indigo-500'
            : 'border-gray-300 hover:border-indigo-400'
        )}
      >
        {todo.completed && <Check size={11} className="text-white" strokeWidth={3} />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            autoFocus
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-gray-50 border border-indigo-300 rounded-lg px-2 py-1 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-indigo-400"
          />
        ) : (
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={clsx(
                'text-sm font-medium truncate',
                todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
              )}
            >
              {todo.text}
            </span>
            <span
              className={clsx(
                'text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0',
                priorityBadge[todo.priority]
              )}
            >
              {todo.priority}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="p-1.5 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-600 transition-colors duration-150"
              aria-label="Save"
            >
              <Check size={14} />
            </button>
            <button
              onClick={handleCancel}
              className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors duration-150"
              aria-label="Cancel"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-indigo-50 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-all duration-150"
              aria-label="Edit"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-150"
              aria-label="Delete"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
