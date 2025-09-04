import React, { useState } from 'react';
import './App.css';
import { User, Task } from './types';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design the user interface',
      description: 'Create wireframes and mockups for the new dashboard',
      status: 'todo',
      priority: 'high',
      assigneeId: 'john-doe',
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      tags: ['design', 'ui/ux', 'frontend']
    },
    {
      id: '2',
      title: 'Implement authentication',
      description: 'Set up user login and registration functionality',
      status: 'in-progress',
      priority: 'urgent',
      assigneeId: 'jane-smith',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['backend', 'security', 'auth']
    },
    {
      id: '3',
      title: 'Write unit tests',
      description: 'Add comprehensive test coverage for all components',
      status: 'review',
      priority: 'medium',
      assigneeId: 'bob-wilson',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['testing', 'quality']
    },
    {
      id: '4',
      title: 'Deploy to production',
      description: 'Set up CI/CD pipeline and deploy the application',
      status: 'done',
      priority: 'low',
      assigneeId: 'alice-brown',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['deployment', 'devops']
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        role: 'user'
      };
      
      setUser(mockUser);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const mockUser: User = {
        id: '1',
        email,
        name,
        role: 'user'
      };
      
      setUser(mockUser);
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setError(null);
  };

  const handleTaskCreate = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setTasks(prev => [...prev, newTask]);
  };

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      )
    );
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  if (!user) {
    return (
      <AuthPage
        onLogin={handleLogin}
        onRegister={handleRegister}
        isLoading={isLoading}
        error={error}
      />
    );
  }

  return (
    <DashboardPage
      user={user}
      tasks={tasks}
      onTaskCreate={handleTaskCreate}
      onTaskUpdate={handleTaskUpdate}
      onTaskDelete={handleTaskDelete}
      onLogout={handleLogout}
    />
  );
}

export default App;