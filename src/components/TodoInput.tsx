import { useState } from 'react';
import type { Priority } from '@/types';
import { Plus } from 'lucide-react';
import clsx from 'clsx';

type TodoInputProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const priorities: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  { value: 'medium', label: 'Medium', color: 'bg-amber-100 text-amber-700 border-amber-300' },
  { value: 'high', label: 'High', color: 'bg-red-100 text-red-700 border-red-300' },
];

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onAdd(text, priority);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl px-4 py-2.5 flex items-center gap-1.5 text-sm font-medium transition-colors duration-150 shadow-sm"
        >
          <Plus size={16} />
          Add
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 font-medium">Priority:</span>
        {priorities.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => setPriority(p.value)}
            className={clsx(
              'px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-150',
              p.color,
              priority === p.value
                ? 'ring-2 ring-offset-1 ring-indigo-400 scale-105'
                : 'opacity-60 hover:opacity-90'
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
    </form>
  );
}
