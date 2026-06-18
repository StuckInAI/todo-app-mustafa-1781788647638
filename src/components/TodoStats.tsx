import { ListTodo, CheckCheck } from 'lucide-react';

type TodoStatsProps = {
  activeCount: number;
  completedCount: number;
};

export default function TodoStats({ activeCount, completedCount }: TodoStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-4 shadow-sm flex items-center gap-3">
        <div className="bg-red-900/50 rounded-xl p-2">
          <ListTodo size={20} className="text-red-400" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{activeCount}</p>
          <p className="text-xs text-neutral-500">Active tasks</p>
        </div>
      </div>
      <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-4 shadow-sm flex items-center gap-3">
        <div className="bg-emerald-900/50 rounded-xl p-2">
          <CheckCheck size={20} className="text-emerald-500" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{completedCount}</p>
          <p className="text-xs text-neutral-500">Completed</p>
        </div>
      </div>
    </div>
  );
}
