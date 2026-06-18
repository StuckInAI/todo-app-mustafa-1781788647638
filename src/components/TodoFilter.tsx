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
    <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 shadow-sm">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          className={clsx(
            'flex-1 py-1.5 rounded-lg text-sm font-medium transition-all duration-150',
            filter === f.value
              ? 'bg-indigo-500 text-white shadow-sm'
              : 'text-gray-500 hover:bg-gray-50'
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
