import { useState } from 'react';
import type { Priority } from '@/types';
import { Plus } from 'lucide-react';
import clsx from 'clsx';

type TodoInputProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const priorities: { value: Priority; label: string; color: string; ring: string }[] = [
  { value: 'low', label: 'Low', color: 'bg-emerald-900/50 text-emerald-400 border-emerald-700', ring: 'ring-emerald-500' },
  { value: 'medium', label: 'Medium', color: 'bg-amber-900/50 text-amber-400 border-amber-700', ring: 'ring-amber-500' },
  { value: 'high', label: 'High', color: 'bg-red-900/50 text-red-400 border-red-700', ring: 'ring-red-500' },
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
    <form onSubmit={handleSubmit} className="bg-neutral-800 rounded-2xl shadow-sm border border-neutral-700 p-4">
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl px-4 py-2.5 flex items-center gap-1.5 text-sm font-medium transition-colors duration-150 shadow-sm shadow-red-900/50"
        >
          <Plus size={16} />
          Add
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-neutral-500 font-medium">Priority:</span>
        {priorities.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => setPriority(p.value)}
            className={clsx(
              'px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-150',
              p.color,
              priority === p.value
                ? `ring-2 ring-offset-1 ring-offset-neutral-800 ${p.ring} scale-105`
                : 'opacity-50 hover:opacity-80'
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
    </form>
  );
}
