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
  low: 'border-l-emerald-500',
  medium: 'border-l-amber-500',
  high: 'border-l-red-500',
};

const priorityBadge: Record<string, string> = {
  low: 'bg-emerald-900/50 text-emerald-400',
  medium: 'bg-amber-900/50 text-amber-400',
  high: 'bg-red-900/50 text-red-400',
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
        'bg-neutral-800 border border-neutral-700 rounded-2xl shadow-sm border-l-4 px-4 py-3 flex items-center gap-3 transition-all duration-150 group hover:border-neutral-600',
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
            ? 'bg-red-600 border-red-600'
            : 'border-neutral-500 hover:border-red-500'
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
            className="w-full bg-neutral-900 border border-red-500 rounded-lg px-2 py-1 text-sm text-neutral-100 outline-none focus:ring-2 focus:ring-red-500"
          />
        ) : (
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={clsx(
                'text-sm font-medium truncate',
                todo.completed ? 'line-through text-neutral-600' : 'text-neutral-100'
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
              className="p-1.5 rounded-lg bg-red-900/50 hover:bg-red-800 text-red-400 transition-colors duration-150"
              aria-label="Save"
            >
              <Check size={14} />
            </button>
            <button
              onClick={handleCancel}
              className="p-1.5 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-neutral-400 transition-colors duration-150"
              aria-label="Cancel"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-700 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-150"
              aria-label="Edit"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-neutral-500 hover:bg-red-900/50 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-150"
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
