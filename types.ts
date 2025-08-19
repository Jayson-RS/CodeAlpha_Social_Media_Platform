
export interface User {
  id: number;
  username: string;
  fullName: string;
  profilePicture: string;
  bio?: string;
}

export interface Comment {
  id: number;
  user: User;
  text: string;
  timestamp: string;
}

export interface Post {
  id: number;
  author: User;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
}
