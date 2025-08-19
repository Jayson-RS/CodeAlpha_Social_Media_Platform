
import { User, Post } from '../types';

export const mockUsers: User[] = [
  { id: 1, username: 'you', fullName: 'You', profilePicture: 'https://picsum.photos/seed/you/100/100' },
  { id: 2, username: 'jdoe', fullName: 'John Doe', profilePicture: 'https://picsum.photos/seed/jdoe/100/100' },
  { id: 3, username: 'asmith', fullName: 'Alice Smith', profilePicture: 'https://picsum.photos/seed/asmith/100/100' },
  { id: 4, username: 'brian', fullName: 'Brian C.', profilePicture: 'https://picsum.photos/seed/brian/100/100' },
  { id: 5, username: 'chloe', fullName: 'Chloe Davis', profilePicture: 'https://picsum.photos/seed/chloe/100/100' },
];

export const mockPosts: Post[] = [
  {
    id: 1,
    author: mockUsers[2],
    content: "Just finished a great hike at Sunrise Peak! The views were absolutely breathtaking. ☀️⛰️ #hiking #nature #adventure",
    image: "https://picsum.photos/seed/hike1/600/400",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    likes: 128,
    isLiked: false,
    comments: [
      { id: 1, user: mockUsers[1], text: "Wow, that looks amazing!", timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString() },
      { id: 2, user: mockUsers[3], text: "I need to go there!", timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString() },
    ],
  },
  {
    id: 2,
    author: mockUsers[1],
    content: "My new home office setup is finally complete! Loving the productivity boost. What's your must-have desk item? 💻🪴 #wfh #desksetup #productivity",
    image: "https://picsum.photos/seed/office2/600/400",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    likes: 76,
    isLiked: true,
    comments: [],
  },
  {
    id: 3,
    author: mockUsers[4],
    content: "Experimenting with some new recipes in the kitchen today. This sourdough came out perfectly! 🍞👨‍🍳 #baking #sourdough #foodie",
    image: "https://picsum.photos/seed/bread3/600/400",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    likes: 231,
    isLiked: false,
    comments: [
      { id: 3, user: mockUsers[2], text: "That looks delicious! Can you share the recipe?", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString() },
    ],
  },
];
