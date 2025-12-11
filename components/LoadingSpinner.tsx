import React from 'react';

const LoadingSpinner: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-96 space-y-6 text-amber-100/80 animate-pulse">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-amber-600/30 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-amber-500 rounded-full animate-spin"></div>
      </div>
      <p className="text-lg font-light tracking-widest uppercase">{message}</p>
    </div>
  );
};

export default LoadingSpinner;