import React, { Component, ErrorInfo } from 'react';
import { useNavigate, useRouteError, isRouteErrorResponse } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

// Functional component for error content
const ErrorContent: React.FC<{ error: Error | null }> = ({ error }) => {
  const routeError = useRouteError();
  const navigate = useNavigate();

  let errorMessage = 'An unexpected error occurred';
  let errorDetails = '';

  // Handle different types of errors
  if (isRouteErrorResponse(routeError)) {
    errorMessage = routeError.status === 404 
      ? 'Page not found' 
      : routeError.statusText;
    errorDetails = routeError.data?.message || '';
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorDetails = error.stack || '';
  } else if (routeError instanceof Error) {
    errorMessage = routeError.message;
    errorDetails = routeError.stack || '';
  }

  const handleRetry = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-8">
        {/* ... rest of your JSX ... */}
      </div>
    </div>
  );
};

// Class component for catching errors
class ErrorBoundaryClass extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorContent error={this.state.error} />;
    }

    return this.props.children;
  }
}

// Main ErrorBoundary component
const ErrorBoundary: React.FC<Props> = ({ children }) => {
  return (
    <ErrorBoundaryClass>
      {children}
    </ErrorBoundaryClass>
  );
};

// Route error boundary component
const RouteErrorBoundary: React.FC = () => {
  return <ErrorContent error={null} />;
};

// Single export statement
export { ErrorBoundary, RouteErrorBoundary };