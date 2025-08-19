
import React, { useState, useCallback, useEffect } from 'react';
import { Post, User } from './types';
import { mockPosts, mockUsers } from './data/mock';
import Header from './components/Header';
import Feed from './components/Feed';
import RightSidebar from './components/RightSidebar';
import CreatePost from './components/CreatePost';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users] = useState<User[]>(mockUsers);
  const [currentUser] = useState<User>(mockUsers[0]);

  useEffect(() => {
    // Simulate fetching posts
    setPosts(mockPosts);
  }, []);

  const handleAddPost = useCallback((newPost: Post) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  }, []);

  const handleLikePost = useCallback((postId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
          : post
      )
    );
  }, []);

  const handleAddComment = useCallback((postId: number, commentText: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const newComment = {
            id: Date.now(),
            user: currentUser,
            text: commentText,
            timestamp: new Date().toISOString(),
          };
          return { ...post, comments: [...post.comments, newComment] };
        }
        return post;
      })
    );
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header user={currentUser} />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="md:col-span-2 lg:col-span-3">
            <CreatePost user={currentUser} onAddPost={handleAddPost} />
            <Feed
              posts={posts}
              onLikePost={handleLikePost}
              onAddComment={handleAddComment}
            />
          </div>
          <aside className="hidden md:block">
            <RightSidebar currentUser={currentUser} users={users} />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default App;
