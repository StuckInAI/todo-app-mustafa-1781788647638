import type { Todo } from '@/types';
import TodoItem from '@/components/TodoItem';
import { ClipboardList } from 'lucide-react';

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

export default function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="bg-neutral-800 border border-neutral-700 rounded-2xl shadow-sm p-10 flex flex-col items-center gap-3 text-center">
        <div className="bg-neutral-700 rounded-full p-4">
          <ClipboardList size={32} className="text-neutral-500" />
        </div>
        <p className="text-neutral-400 font-medium">No tasks here</p>
        <p className="text-xs text-neutral-600">Add a task above to get started!</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
