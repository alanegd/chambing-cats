// en: src/components/features/PostCard.tsx

import React from 'react';
import { MessageSquare, Heart } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { Card } from '../ui/Card';
import { IconWrapper } from '../ui/IconWrapper';
import type { Post } from '../../types/Post';

interface PostCardProps {
  post: Post;
}

/**
 * Tarjeta que muestra una vista previa de una publicación.
 * Al hacer clic, abre la vista de detalle.
 */
export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const selectPost = useAppStore(state => state.selectPost);
  
  return (
    <Card 
      className="group cursor-pointer transform hover:-translate-y-1 transition-transform duration-300"
      onClick={() => selectPost(post)}
    >
      <div className="relative">
        <img 
          // ¡CORRECCIÓN! La propiedad correcta es 'mediaUrl'.
          src={post.mediaUrl} 
          alt={post.caption} 
          className="w-full h-auto aspect-square object-cover bg-gray-200"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
      </div>
      <div className="p-3 bg-white flex items-center justify-start space-x-4">
        <IconWrapper className="text-gray-600">
          <MessageSquare className="w-5 h-5" />
          <span className="ml-1 text-sm font-medium">{post.commentsCount}</span>
        </IconWrapper>
        <IconWrapper className="text-gray-600">
          <Heart className="w-5 h-5" />
          <span className="ml-1 text-sm font-medium">{post.likes}</span>
        </IconWrapper>
      </div>
    </Card>
  );
};