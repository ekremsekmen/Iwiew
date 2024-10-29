import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative bg-gradient-to-br from-gray-300 via-gray-300 to-gray-200 border border-gray-400 rounded-lg shadow-lg max-w-2xl w-auto h-auto transition-all duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '80vh', overflowY: 'auto', padding: '1rem' }}
      >
        <div className="flex items-center justify-between p-2 border-b border-gray-200 bg-gray-300 rounded-t-lg">
          <button
            className="absolute top-1 right-1 w-6 h-6 bg-gray-300 border border-gray-500 rounded-sm flex items-center justify-center text-gray-700 font-bold hover:bg-gray-400 hover:text-black transition-colors"
            onClick={onClose}
            title="Close"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col items-stretch p-4">
          {children}
        </div>
      </div>
    </div>
  );
  
  
};

export default Modal;
