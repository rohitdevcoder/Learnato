import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PostList from "../components/PostList";
import PostDetailPage from "./PostDetailPage";
import CreatePostModal from "../components/CreatePostModal";
import { useAppContext } from "../context/AppContext";

const ArrowUpIcon = ({ size = 22, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    width={size}
    height={size}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
    />
  </svg>
);

const ChatBubbleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    width={16}
    height={16}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443H18.75A2.25 2.25 0 0 0 21 14.25V8.25A2.25 2.25 0 0 0 18.75 6H5.25A2.25 2.25 0 0 0 3 8.25v4.51Z"
    />
  </svg>
);

const ArrowLeftIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    width={16}
    height={16}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
    />
  </svg>
);

const mockPostsData = [
  {
    id: "1",
    title: "How do I deploy Node.js on Cloud Run?",
    content:
      "I have my Node.js app ready, but I am confused about the gcloud commands and the Dockerfile. I've enabled Cloud Build, but what's the exact command to deploy from my local machine? My Dockerfile is in the root.",
    author: "Rohan",
    votes: 5,
    replies: [
      {
        id: "r1",
        author: "InstructorJane",
        content:
          "Use gcloud CLI with region flag. The command is `gcloud run deploy...`",
      },
      {
        id: "r2",
        author: "Sam",
        content:
          "Enable Cloud Build first! This tripped me up. Make sure your `gcloud config set project` is correct too.",
      },
      {
        id: "r3",
        author: "Rohan",
        content: "Thanks! The `gcloud run deploy` command worked.",
      },
    ],
  },
  {
    id: "2",
    title: "Best way to handle global state in React?",
    content:
      "My app is getting complex. Props are being passed down 5 levels (prop drilling). Should I use Context API, Redux, or Zustand? What are the pros/cons for this hackathon?",
    author: "Aisha",
    votes: 12,
    replies: [
      {
        id: "r4",
        author: "InstructorJane",
        content:
          "For a hackathon, Context API is perfect. It's built-in and great for simple global state like user auth. Redux is too much boilerplate. Zustand is also a great, modern choice if you want to try something new.",
      },
    ],
  },
];

function Home() {
    const {setIsModalOpen,isModalOpen} = useAppContext()
  const [posts, setPosts] = useState(mockPostsData);
//   const [currentView, setCurrentView] = useState({ page: 'list' });
//   const [isModalOpen, setIsModalOpen] = useState(false);

  // We use state to simulate navigation, instead of React Router
  // { page: 'list' } or { page: 'detail', postId: '1' }
  const [currentView, setCurrentView] = useState({ page: "list" });

  // --- Data-handling Functions ---

  const handleUpvote = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, votes: post.votes + 1 } : post
      )
    );
  };

  const handleAddReply = (postId, replyContent) => {
    const newReply = {
      id: `r${Date.now()}`, // Simple unique ID
      author: "CurrentUser", // Mocked user
      content: replyContent,
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, replies: [...post.replies, newReply] }
          : post
      )
    );
  };

  // --- Navigation Functions ---

  const navigateToDetail = (postId) => {
    setCurrentView({ page: "detail", postId: postId });
  };

  const navigateToList = () => {
    setCurrentView({ page: "list" });
  };

  const handleCreatePost = () => { /* ... */ };

  return (
    <>
      <Navbar />
      {/* <button onClick={()=>setIsModalOpen(true)}>Create</button> */}
      <div className="bg-gray-100 min-h-screen font-sans">
        <main className="container mx-auto max-w-3xl p-4">
          {currentView.page === "list" && (
            <PostList
              posts={posts}
              onPostClick={navigateToDetail}
              onUpvoteClick={handleUpvote}
            />
          )}

          {currentView.page === "detail" && (
            <PostDetailPage
              // Find the correct post to display
              post={posts.find((p) => p.id === currentView.postId)}
              onBackClick={navigateToList}
              onUpvote={handleUpvote}
              onAddReply={handleAddReply}
            />
          )}
        </main>
        <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePost}
      />
      </div>
    </>
  );
}

export default Home;
