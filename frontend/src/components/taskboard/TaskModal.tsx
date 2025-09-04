import React, { useState } from 'react';
import { Task } from '../../types';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  task?: Task | null;
  initialStatus?: string;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  task,
  initialStatus = 'todo'
}) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState(task?.priority || 'medium');
  const [status, setStatus] = useState(task?.status || initialStatus);
  const [assigneeId, setAssigneeId] = useState(task?.assigneeId || '');
  const [tags, setTags] = useState(task?.tags.join(', ') || '');
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? task.dueDate.toISOString().split('T')[0] : ''
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      priority: priority as Task['priority'],
      status: status as Task['status'],
      assigneeId: assigneeId.trim() || undefined,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      dueDate: dueDate ? new Date(dueDate) : undefined
    };

    onSave(taskData);
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setStatus('todo');
    setAssigneeId('');
    setTags('');
    setDueDate('');
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={task ? 'Edit Task' : 'Create New Task'}
      size="lg"
    >
      <div className="space-y-4">
        <Input
          label="Title"
          value={title}
          onChange={setTitle}
          error={errors.title}
          placeholder="Enter task title"
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Task['priority'])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Task['status'])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Assignee"
            value={assigneeId}
            onChange={setAssigneeId}
            placeholder="Enter assignee name"
          />

          <Input
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={setDueDate}
          />
        </div>

        <Input
          label="Tags"
          value={tags}
          onChange={setTags}
          placeholder="Enter tags separated by commas"
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {task ? 'Update Task' : 'Create Task'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;