import React from 'react';

import type { LoadingModalProps } from './loadingModal.types'

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen, message = 'Loading' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35">
      <div className="bg-white px-8 py-6 rounded-xl shadow-2xl flex flex-col items-center">
        {/* Spinner from div  */}
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Message */}
        <p className="mt-4 text-gray-800 font-medium">{message ?? "Loading"}</p>
      </div>
    </div>
  );
};

export default LoadingModal;
