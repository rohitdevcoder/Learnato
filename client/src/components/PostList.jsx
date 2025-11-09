import React from 'react'
import PostItem from './PostItem';

function PostList({ posts, onPostClick, onUpvoteClick }) {
  // Sort posts by votes (descending)
  const sortedPosts = [...posts].sort((a, b) => b.votes - a.votes);

  return (
    <div className="space-y-4">
      {/* In a real app, you'd have a <CreatePostForm /> here */}
      <h2 className="text-xl font-semibold text-gray-800">[+ Discussion Forum]</h2>
      {sortedPosts.map(post => (
        <PostItem
          key={post.id}
          post={post}
          onPostClick={() => onPostClick(post.id)}
          onUpvoteClick={(e) => {
            e.stopPropagation(); // Prevent navigating when upvoting
            onUpvoteClick(post.id);
          }}
        />
      ))}
    </div>
  );
}

export default PostList