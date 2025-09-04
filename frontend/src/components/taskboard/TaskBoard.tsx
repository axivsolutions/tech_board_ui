import React, { useState } from 'react';
import { Task } from '../../types';
import BoardColumn from './BoardColumn';
import TaskModal from './TaskModal';
import Button from '../common/Button';

interface TaskBoardProps {
  tasks: Task[];
  onTaskCreate: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
  onTaskDelete: (taskId: string) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  onTaskCreate,
  onTaskUpdate,
  onTaskDelete
}) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [initialStatus, setInitialStatus] = useState<string>('todo');

  const columns = [
    { title: 'To Do', status: 'todo' as const },
    { title: 'In Progress', status: 'in-progress' as const },
    { title: 'Review', status: 'review' as const },
    { title: 'Done', status: 'done' as const }
  ];

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const handleTaskCreate = (status: string) => {
    setEditingTask(null);
    setInitialStatus(status);
    setIsTaskModalOpen(true);
  };

  const handleTaskEdit = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleTaskSave = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask) {
      onTaskUpdate(editingTask.id, taskData);
    } else {
      onTaskCreate(taskData);
    }
  };

  const handleTaskDrop = (taskId: string, newStatus: string) => {
    onTaskUpdate(taskId, { status: newStatus as Task['status'] });
  };

  const handleCloseModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Board</h1>
          <p className="text-gray-600 mt-1">Manage your tasks efficiently with drag and drop</p>
        </div>
        <Button onClick={() => handleTaskCreate('todo')}>
          + New Task
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4">
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.status);
          return (
            <div key={column.status} className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900">{column.title}</h3>
              <p className="text-2xl font-bold text-primary-600 mt-1">{columnTasks.length}</p>
            </div>
          );
        })}
      </div>

      {/* Board */}
      <div className="grid grid-cols-4 gap-6">
        {columns.map((column) => (
          <BoardColumn
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={getTasksByStatus(column.status)}
            onTaskEdit={handleTaskEdit}
            onTaskDelete={onTaskDelete}
            onTaskCreate={handleTaskCreate}
            onTaskDrop={handleTaskDrop}
          />
        ))}
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={handleCloseModal}
        onSave={handleTaskSave}
        task={editingTask}
        initialStatus={initialStatus}
      />
    </div>
  );
};

export default TaskBoard;