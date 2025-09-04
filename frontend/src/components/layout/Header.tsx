import React from 'react';
import { User } from '../../types';
import Button from '../common/Button';

interface HeaderProps {
  user?: User | null;
  onLogin?: () => void;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogin, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary-600">Tech Board</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              Dashboard
            </button>
            <button className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              Projects
            </button>
            <button className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              Teams
            </button>
          </nav>

          {/* User menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-gray-700 font-medium">{user.name}</span>
                </div>
                <Button variant="outline" size="sm" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={onLogin}>
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;