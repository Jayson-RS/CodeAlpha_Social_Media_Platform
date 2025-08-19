
import React from 'react';
import { User } from '../types';

interface RightSidebarProps {
  currentUser: User;
  users: User[];
}

const RightSidebar: React.FC<RightSidebarProps> = ({ currentUser, users }) => {
  const suggestedUsers = users.filter(user => user.id !== currentUser.id).slice(0, 4);

  return (
    <div className="sticky top-24 space-y-6">
      <div className="flex items-center space-x-4">
        <img
          src={currentUser.profilePicture}
          alt={currentUser.username}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <p className="font-bold text-gray-800">{currentUser.fullName}</p>
          <p className="text-sm text-gray-500">@{currentUser.username}</p>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="font-bold text-gray-800 mb-4">Suggestions for you</h3>
        <div className="space-y-4">
          {suggestedUsers.map(user => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={user.profilePicture}
                  alt={user.username}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-bold text-sm text-gray-800">{user.fullName}</p>
                  <p className="text-xs text-gray-500">@{user.username}</p>
                </div>
              </div>
              <button className="text-sm font-semibold text-brand-blue hover:text-blue-700 focus:outline-none">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <footer className="text-xs text-gray-400 space-x-2">
          <span>&copy; {new Date().getFullYear()} GeminiFeed</span>
      </footer>
    </div>
  );
};

export default RightSidebar;
