// src/components/CreatePostModal.jsx

import React, { useState, useEffect } from 'react';

// --- SVG Icon (Needed for this component) ---
const CloseIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    width={24} 
    height={24} 
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);


function CreatePostModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  // Effect to add/remove 'overflow-hidden' from body
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    // Cleanup function
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }
    
    onSubmit({ title, content });
    
    // Clear form on successful submit
    setTitle('');
    setContent('');
  };

  // Don't render anything if not open
  if (!isOpen) {
    return null;
  }

  return (
    // --- Modal Overlay ---
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* --- Modal Panel --- */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        className="relative w-full max-w-lg transform rounded-xl bg-white p-6 shadow-xl transition-all m-4"
      >
        {/* --- Close Button --- */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 flex cursor-pointer h-8 w-8 items-center justify-center rounded-full bg-gray-500 text-white hover:bg-gray-600"
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>

        {/* --- Modal Content --- */}
        <form onSubmit={handleSubmit}>
          <h3 className="text-2xl font-bold text-gray-900" id="modal-title">
            Ask a New Question
          </h3>
          
          {error && (
            <div className="my-3 rounded-md bg-red-100 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mt-6 space-y-4">
            {/* --- Title Field --- */}
            <div>
              <label htmlFor="post-title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="post-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border"
                placeholder="How do I...?"
              />
            </div>
            
            {/* --- Content Field --- */}
            <div>
              <label htmlFor="post-content" className="block text-sm font-medium text-gray-700">
                Details
              </label>
              <textarea
                id="post-content"
                rows="5"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border"
                placeholder="Describe your question, what you've tried, and what you're stuck on."
              />
            </div>
          </div>

          {/* --- Modal Footer (Buttons) --- */}
          <div className="mt-6 flex flex-row-reverse space-x-3 space-x-reverse">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 rounded bg-primary text-white cursor-pointer hover:bg-gray-700 transition duration-200 sm:text-sm"
            >
              Post Question
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex cursor-pointer justify-center rounded border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePostModal;