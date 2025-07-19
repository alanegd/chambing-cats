import type { Comment } from "./Comment";
import type { SocialNetwork } from "./SocialNetwork";

export interface Post {
  id: string;
  platform: SocialNetwork;
  caption: string;
  mediaUrl: string; 
  likes: number;
  commentsCount: number;
  publishedAt: string; 
  comments: Comment[];
}