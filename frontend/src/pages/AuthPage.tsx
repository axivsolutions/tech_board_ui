import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

type AuthView = 'login' | 'register' | 'forgot-password';

interface AuthPageProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (name: string, email: string, password: string) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

const AuthPage: React.FC<AuthPageProps> = ({
  onLogin,
  onRegister,
  isLoading = false,
  error
}) => {
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResetPassword = async (email: string) => {
    // Simulate API call
    console.log('Password reset requested for:', email);
    setResetSuccess(true);
  };

  switch (currentView) {
    case 'register':
      return (
        <RegisterForm
          onRegister={onRegister}
          onSwitchToLogin={() => setCurrentView('login')}
          isLoading={isLoading}
          error={error}
        />
      );

    case 'forgot-password':
      return (
        <ForgotPasswordForm
          onResetPassword={handleResetPassword}
          onBackToLogin={() => setCurrentView('login')}
          isLoading={isLoading}
          error={error}
          success={resetSuccess}
        />
      );

    default:
      return (
        <LoginForm
          onLogin={onLogin}
          onSwitchToRegister={() => setCurrentView('register')}
          onForgotPassword={() => setCurrentView('forgot-password')}
          isLoading={isLoading}
          error={error}
        />
      );
  }
};

export default AuthPage;