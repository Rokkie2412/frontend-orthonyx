import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ModalProps } from './dataModal.types';
import { MdClose } from 'react-icons/md';

const _renderXButton = (usingCloseButton: boolean, onClose: () => void): React.ReactElement | null => {
  if (usingCloseButton === false) {
    return null;
  }

  return (
    <button
      onClick={onClose}
      className="cursor-pointer absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl"
    >
      <MdClose size={26} />
    </button>
  )
}

const Modal = ({ isOpen, onClose, title, children, usingCloseButton = true }: ModalProps): React.ReactElement => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 18, stiffness: 200 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg sm:w-[80%] md:w-full p-6 relative"
          >
            {_renderXButton(usingCloseButton, onClose)}
            <h3 className="text-lg sm:text-2xl font-bold text-blue-600 mb-4">{title}</h3>
            <div className="divide-y divide-gray-200 space-y-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export default Modal;
