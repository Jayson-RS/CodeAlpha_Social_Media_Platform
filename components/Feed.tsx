
import React from 'react';
import { Post } from '../types';
import PostCard from './PostCard';

interface FeedProps {
  posts: Post[];
  onLikePost: (postId: number) => void;
  onAddComment: (postId: number, commentText: string) => void;
}

const Feed: React.FC<FeedProps> = ({ posts, onLikePost, onAddComment }) => {
  return (
    <div className="space-y-6">
      {posts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          onLike={onLikePost}
          onAddComment={onAddComment}
        />
      ))}
    </div>
  );
};

export default Feed;
