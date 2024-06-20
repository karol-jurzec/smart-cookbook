import React from 'react';
import './LoadingButton.css';

interface LoadingButtonProps {
  isLoading: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  className?: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ isLoading, onClick, type = "button", children, className }) => {
  return (
    <button onClick={onClick} type={type} className={`loading-button ${className}`} disabled={isLoading}>
      {isLoading && <div className="spinner" />}
      {!isLoading && children}
    </button>
  );
};

export default LoadingButton;
