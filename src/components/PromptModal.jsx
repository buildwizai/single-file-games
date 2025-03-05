import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closePromptModal } from '../redux/slices/uiSlice';

const PromptModal = () => {
  const dispatch = useDispatch();
  const { promptModalOpen, promptModalContent, promptModalTitle } = useSelector((state) => state.ui);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleClose = () => {
    dispatch(closePromptModal());
  };

  const handleCopy = async () => {
    if (!promptModalContent) return;
    
    try {
      await navigator.clipboard.writeText(promptModalContent);
      setCopySuccess(true);
      
      // Reset after 2 seconds
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy to clipboard');
    }
  };

  if (!promptModalOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-start pt-16 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl mx-auto p-6 max-w-3xl w-full max-h-[80vh] flex flex-col relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-indigo-700">{promptModalTitle}</h2>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className={`${
                copySuccess
                  ? 'bg-green-100 text-green-700'
                  : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
              } px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors`}
            >
              <i className={`fas ${copySuccess ? 'fa-check' : 'fa-copy'}`}></i>
              <span>{copySuccess ? 'Copied!' : 'Copy'}</span>
            </button>
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              &times;
            </button>
          </div>
        </div>
        <div className="overflow-y-auto flex-grow border border-gray-200 rounded-lg">
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap h-full text-left">
            {promptModalContent || 'Loading prompt...'}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;