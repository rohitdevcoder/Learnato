import React from 'react'
import { IoIosArrowForward } from "react-icons/io";

function PostItem({ post, onPostClick, onUpvoteClick }) {
  if (!post) return null;

  return (
    <div
      onClick={onPostClick}
      className="block bg-white shadow-md hover:shadow-lg rounded-lg p-4 transition duration-200 cursor-pointer"
    >
      <div className="flex">
        <div className="shrink-0 flex flex-col items-center mr-4 w-16">
          <span className="text-3xl font-bold text-gray-400">{post.votes || 0}</span>
          <span className="text-xs text-gray-500">VOTES</span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            <span className="font-bold text-gray-400">Q:</span> {post.title}
          </h3>
          <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-600">
            <span className="flex items-center">
              {/* <ChatBubbleIcon className="mr-1" /> */}
              {post.replies?.length || 0} Replies
            </span>
            <span>Posted by: <span className="font-medium">{post.author || 'Anonymous'}</span></span>
          </div>
        </div>
        <div className="shrink-0 ml-4">
          {/* <button
            onClick={onUpvoteClick}
            title="Upvote"
            className="flex items-center justify-center p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-100 transition"
          >
            <ArrowUpIcon size={22} />
          </button> */}
          <button
          onClick={onPostClick}
          className='flex items-center justify-center cursor-pointer p-2 rounded-full text-gray-500 hover:text-black hover:bg-gray-100 transition'
          ><IoIosArrowForward  size={22}/></button>
        </div>
      </div>
    </div>
  );
}

export default PostItem