import React from 'react';
import { Task, User } from '../types';
import TaskBoard from '../components/taskboard/TaskBoard';
import Layout from '../components/layout/Layout';

interface DashboardPageProps {
  user: User;
  tasks: Task[];
  onTaskCreate: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
  onTaskDelete: (taskId: string) => void;
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  tasks,
  onTaskCreate,
  onTaskUpdate,
  onTaskDelete,
  onLogout
}) => {
  return (
    <Layout user={user} onLogout={onLogout}>
      <TaskBoard
        tasks={tasks}
        onTaskCreate={onTaskCreate}
        onTaskUpdate={onTaskUpdate}
        onTaskDelete={onTaskDelete}
      />
    </Layout>
  );
};

export default DashboardPage;