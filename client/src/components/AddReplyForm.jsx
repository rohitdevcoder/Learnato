import React, { useState } from 'react'

function AddReplyForm({ onSubmitReply }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmitReply(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 pt-6 mt-6">
      <h3 className="text-lg font-semibold mb-3">Add Your Reply</h3>
      <textarea
        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
        rows="4"
        placeholder="Share your insights, code snippets, or a solution..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button
        type="submit"
        className="mt-3 px-4 py-2 rounded bg-primary text-white cursor-pointer hover:bg-gray-700 transition duration-200"
      >
        Post Reply
      </button>
    </form>
  );
}

export default AddReplyForm