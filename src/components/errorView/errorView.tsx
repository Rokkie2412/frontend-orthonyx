import React from 'react';

import type { ErrorViewProps } from './errorView.types';

const handleRefresh = (): void => {
  window.location.reload();
};

const ErrorView = ({ error }: ErrorViewProps): React.ReactElement => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-200px)] text-center px-4">
      <p className="text-gray-600 font-semibold text-base sm:text-lg mb-4">
        {error || 'Something went wrong. Please refresh the page.'}
      </p>
      <button
        onClick={handleRefresh}
        className="cursor-pointer font-semibold bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base py-2 px-4 rounded-lg shadow-sm transition"
      >
        Refresh
      </button>
    </div>
  );
};

export default ErrorView;
