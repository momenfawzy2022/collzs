import React from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

type ResponseType = 'success' | 'error' | 'info';

interface ResponseProps {
  type: ResponseType;
  message: string;
  className?: string;
}

const Response: React.FC<ResponseProps> = ({ type, message, className = '' }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-green-500" />;
      case 'error':
        return <FaExclamationCircle className="text-red-500" />;
      case 'info':
        return <FaInfoCircle className="text-blue-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border p-4 ${getBackgroundColor()} ${className}`}
    >
      <div className="flex-shrink-0">{getIcon()}</div>
      <p className="text-sm font-medium text-gray-700">{message}</p>
    </div>
  );
};

export default Response; 