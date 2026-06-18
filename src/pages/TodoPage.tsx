import { useTodos } from '@/hooks/useTodos';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFilter from '@/components/TodoFilter';
import TodoStats from '@/components/TodoStats';
import { CheckSquare } from 'lucide-react';

export default function TodoPage() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-red-950 py-10 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-red-600 rounded-2xl p-2.5 shadow-lg shadow-red-900/50">
            <CheckSquare className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white leading-tight">My Tasks</h1>
            <p className="text-sm text-red-400">Stay organised & get things done</p>
          </div>
        </div>

        {/* Stats */}
        <TodoStats activeCount={activeCount} completedCount={completedCount} />

        {/* Input */}
        <div className="mb-4">
          <TodoInput onAdd={addTodo} />
        </div>

        {/* Filter */}
        <div className="mb-4">
          <TodoFilter filter={filter} setFilter={setFilter} />
        </div>

        {/* List */}
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />

        {/* Clear completed */}
        {completedCount > 0 && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearCompleted}
              className="text-sm text-neutral-500 hover:text-red-400 transition-colors duration-150 underline underline-offset-2"
            >
              Clear {completedCount} completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
