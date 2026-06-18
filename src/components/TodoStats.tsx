import { ListTodo, CheckCheck } from 'lucide-react';

type TodoStatsProps = {
  activeCount: number;
  completedCount: number;
};

export default function TodoStats({ activeCount, completedCount }: TodoStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-3">
        <div className="bg-indigo-100 rounded-xl p-2">
          <ListTodo size={20} className="text-indigo-600" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">{activeCount}</p>
          <p className="text-xs text-gray-500">Active tasks</p>
        </div>
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-3">
        <div className="bg-emerald-100 rounded-xl p-2">
          <CheckCheck size={20} className="text-emerald-600" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">{completedCount}</p>
          <p className="text-xs text-gray-500">Completed</p>
        </div>
      </div>
    </div>
  );
}
