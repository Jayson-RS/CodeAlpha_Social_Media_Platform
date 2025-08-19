
import React, { useState } from 'react';
import { User, Post } from '../types';
import { generatePostContent } from '../services/geminiService';
import { Sparkles, LoaderCircle } from './Icons';

interface CreatePostProps {
  user: User;
  onAddPost: (post: Post) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ user, onAddPost }) => {
  const [content, setContent] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newPost: Post = {
      id: Date.now(),
      author: user,
      content,
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      comments: [],
      image: 'https://picsum.photos/seed/' + Date.now() + '/600/400' // Random image for new post
    };
    onAddPost(newPost);
    setContent('');
    setAiPrompt('');
  };

  const handleGenerateContent = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    try {
      const generatedText = await generatePostContent(aiPrompt);
      setContent(generatedText);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
      <div className="flex items-start space-x-4">
        <img src={user.profilePicture} alt={user.username} className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <form onSubmit={handlePostSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`What's on your mind, ${user.fullName}?`}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue/50 resize-none"
              rows={3}
            />
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-2">
                   <Sparkles className="w-5 h-5 text-blue-500" />
                   <h3 className="text-sm font-semibold text-blue-800">Generate with AI</h3>
                 </div>
                 <button
                  type="button"
                  onClick={handleGenerateContent}
                  disabled={isGenerating}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-brand-blue rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
                 >
                  {isGenerating ? <LoaderCircle className="animate-spin w-5 h-5 mr-2" /> : null}
                  {isGenerating ? 'Generating...' : 'Generate'}
                 </button>
              </div>
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g., a cheerful post about my morning coffee"
                className="w-full mt-2 p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-blue/50"
              />
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-brand-blue text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={!content.trim()}
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
