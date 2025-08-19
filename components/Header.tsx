
import React from 'react';
import { User } from '../types';
import { Bell, Camera, Search } from './Icons';

interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Camera className="w-8 h-8 text-brand-blue" />
            <h1 className="text-2xl font-bold tracking-tight text-gray-800 hidden sm:block">
              My Feed
            </h1>
          </div>
          <div className="relative flex-1 max-w-xs hidden sm:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-100 border border-gray-200 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue">
              <Bell className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center space-x-2 cursor-pointer">
              <img
                src={user.profilePicture}
                alt={user.username}
                className="w-10 h-10 rounded-full border-2 border-brand-blue"
              />
              <span className="font-semibold text-gray-700 hidden md:block">{user.fullName}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
