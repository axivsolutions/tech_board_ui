import React from 'react';
import { Task } from '../../types';
import TaskCard from './TaskCard';
import Button from '../common/Button';

interface BoardColumnProps {
  title: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  tasks: Task[];
  onTaskEdit: (task: Task) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskCreate: (status: string) => void;
  onTaskDrop: (taskId: string, newStatus: string) => void;
}

const BoardColumn: React.FC<BoardColumnProps> = ({
  title,
  status,
  tasks,
  onTaskEdit,
  onTaskDelete,
  onTaskCreate,
  onTaskDrop
}) => {
  const columnColors = {
    'todo': 'border-gray-200 bg-gray-50',
    'in-progress': 'border-blue-200 bg-blue-50',
    'review': 'border-yellow-200 bg-yellow-50',
    'done': 'border-green-200 bg-green-50'
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    onTaskDrop(taskId, status);
  };

  return (
    <div
      className={`flex-1 bg-white rounded-lg border-2 border-dashed ${columnColors[status]} p-4 min-h-96`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <span className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onTaskCreate(status)}
          className="text-xs"
        >
          + Add
        </Button>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onTaskEdit}
            onDelete={onTaskDelete}
          />
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-sm">No tasks yet</p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onTaskCreate(status)}
              className="mt-2"
            >
              Create your first task
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardColumn;