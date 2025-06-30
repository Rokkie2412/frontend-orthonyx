import React from 'react';
import { FaReact } from 'react-icons/fa';

const Footer = (): React.ReactElement => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-auto fixed bottom-0 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <div className="text-gray-600 text-sm text-center sm:text-left">
            © 2025 MEDICare. All rights reserved.
          </div>
          <div className="text-gray-500 text-xs text-center sm:text-right flex items-center justify-center sm:justify-end space-x-1">
            <span>Built with</span>
            <FaReact className="text-blue-500 w-4 h-4" />
            <span>React.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;