
import React, { useState } from 'react';
import { Post, Comment } from '../types';
import { Heart, MessageCircle, Send } from './Icons';

interface PostCardProps {
  post: Post;
  onLike: (postId: number) => void;
  onAddComment: (postId: number, commentText: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(post.id, newComment);
      setNewComment('');
    }
  };

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(seconds) + "s ago";
  };


  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-4 flex items-center space-x-3 border-b border-gray-200">
        <img
          src={post.author.profilePicture}
          alt={post.author.username}
          className="w-11 h-11 rounded-full"
        />
        <div>
          <p className="font-bold text-sm text-gray-800">{post.author.fullName}</p>
          <p className="text-xs text-gray-500">@{post.author.username} &middot; {timeAgo(post.timestamp)}</p>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
      </div>

      {post.image && (
        <div className="bg-gray-100">
          <img src={post.image} alt="Post content" className="w-full object-cover" />
        </div>
      )}

      <div className="p-4 flex justify-between items-center text-gray-500">
        <div className="flex items-center space-x-6">
          <button onClick={() => onLike(post.id)} className="flex items-center space-x-2 hover:text-brand-red focus:outline-none">
            <Heart className={`w-6 h-6 ${post.isLiked ? 'text-brand-red fill-current' : ''}`} />
            <span className="text-sm font-semibold">{post.likes}</span>
          </button>
          <button onClick={() => setShowComments(!showComments)} className="flex items-center space-x-2 hover:text-brand-blue focus:outline-none">
            <MessageCircle className="w-6 h-6" />
            <span className="text-sm font-semibold">{post.comments.length}</span>
          </button>
        </div>
      </div>

      {showComments && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
            {post.comments.map((comment: Comment) => (
              <div key={comment.id} className="flex items-start space-x-2">
                <img src={comment.user.profilePicture} alt={comment.user.username} className="w-8 h-8 rounded-full mt-1"/>
                <div className="flex-1 bg-gray-100 p-2 rounded-lg">
                  <p className="text-sm">
                    <span className="font-bold text-gray-800">{comment.user.fullName}</span>{' '}
                    <span className="text-gray-600">{comment.text}</span>
                  </p>
                   <p className="text-xs text-gray-400 mt-1">{timeAgo(comment.timestamp)}</p>
                </div>
              </div>
            ))}
             {post.comments.length === 0 && <p className="text-sm text-gray-500 text-center">No comments yet.</p>}
          </div>

          <form onSubmit={handleCommentSubmit} className="mt-4 flex items-center space-x-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 p-2 text-sm bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
            />
            <button type="submit" className="p-2 bg-brand-blue text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostCard;
