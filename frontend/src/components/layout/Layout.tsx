import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { User } from '../../types';

interface LayoutProps {
  children: React.ReactNode;
  user?: User | null;
  onLogin?: () => void;
  onLogout?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogin, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogin={onLogin} onLogout={onLogout} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed bottom-4 left-4 z-50 bg-primary-500 text-white p-3 rounded-full shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  );
};

export default Layout;