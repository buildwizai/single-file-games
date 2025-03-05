import React from 'react';
import { useApp } from '../context/AppContext';

const PromptModal = () => {
  const { promptModal, actions } = useApp();
  const { isOpen, content, title, isLoading } = promptModal;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">{title} - Prompt</h3>
          <button
            onClick={actions.closePromptModal}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-grow">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded">
              {content}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptModal;