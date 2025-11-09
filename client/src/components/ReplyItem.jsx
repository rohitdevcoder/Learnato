import React from 'react'

function ReplyItem({ reply }) {
  const isInstructor = reply.author.toLowerCase().includes('instructor');

  return (
    <div className="border-b border-gray-200 pb-4">
      <div className="flex items-center mb-2">
        <span className="font-semibold text-sm text-gray-800">{reply.author}</span>
        {isInstructor && (
          <span className="ml-2 bg-green-200 text-green-800 text-xs font-bold px-2 py-0.5 rounded-full">
            Instructor
          </span>
        )}
      </div>
      <p className="text-gray-700">
        {reply.content}
      </p>
    </div>
  );
}

export default ReplyItem