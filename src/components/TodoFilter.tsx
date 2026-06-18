import type { Filter } from '@/types';
import clsx from 'clsx';

type TodoFilterProps = {
  filter: Filter;
  setFilter: (f: Filter) => void;
};

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function TodoFilter({ filter, setFilter }: TodoFilterProps) {
  return (
    <div className="flex gap-1 bg-neutral-800 border border-neutral-700 rounded-xl p-1 shadow-sm">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          className={clsx(
            'flex-1 py-1.5 rounded-lg text-sm font-medium transition-all duration-150',
            filter === f.value
              ? 'bg-red-600 text-white shadow-sm shadow-red-900/50'
              : 'text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200'
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
