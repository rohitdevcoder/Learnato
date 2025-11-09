import React from 'react'
import ReplyItem from '../components/ReplyItem';
import AddReplyForm from '../components/AddReplyForm';
import { FaArrowLeftLong } from "react-icons/fa6";

function PostDetailPage({ post, onBackClick, onUpvote, onAddReply }) {
  if (!post) {
    return (
      <div>
        <button onClick={onBackClick} className="px-5 py-4 rounded bg-primary text-white cursor-pointer hover:bg-gray-700 mb-4">
         Back to all posts
        </button>
        <p className="text-center p-10 text-red-500">Post not found.</p>
      </div>
    );
  }

  return (
    <div>
      <button 
        onClick={onBackClick} 
        className="flex items-center px-4 py-2 rounded bg-primary text-white cursor-pointer hover:bg-gray-700 mb-4"
      >
        <FaArrowLeftLong className='mr-2'/>
        Back to all posts
      </button>

      {/* Original Post */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
        <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500 mb-4">
          <span>Posted by: <span className="font-medium">{post.author}</span></span>
          <span>•</span>
          <span>{post.votes} Votes</span>
        </div>
        <p className="text-gray-800 text-base mb-6">
          {post.content}
        </p>
        <button
          onClick={() => onUpvote(post.id)}
          className="px-4 py-2 rounded bg-primary text-white cursor-pointer hover:bg-gray-700 transition duration-200"
        >
          Upvote Post
        </button>
      </div>

      {/* Replies Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-5">{post.replies.length} Replies</h2>
        <div className="space-y-4 mb-6">
          {post.replies.map(reply => (
            <ReplyItem key={reply.id} reply={reply} />
          ))}
        </div>
        <AddReplyForm onSubmitReply={(content) => onAddReply(post.id, content)} />
      </div>
    </div>
  );
}

export default PostDetailPage