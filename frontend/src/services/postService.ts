// en: src/services/postService.ts

import type { Post } from '../types/Post';
import type { SocialNetwork } from '../types/SocialNetwork';

// --- Implementación con Backend Real (descomentar cuando esté listo) ---
/*
export const postService = {
  getPostsByPlatform: async (platform: SocialNetwork): Promise<Post[]> => {
    return apiClient<Post[]>(`/posts?platform=${platform}`);
  },
};
*/

// --- Implementación Mock para desarrollo ---
const generateMockPosts = (platform: SocialNetwork, count: number): Post[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${platform}-${i + 1}`,
    platform,
    // ¡CORRECCIÓN! Se usa 'mediaUrl' en lugar de 'imageUrl'.
    mediaUrl: `https://placehold.co/400x400/000000/FFFFFF?text=${platform.charAt(0).toUpperCase()}+Post+${i + 1}`,
    caption: `¡Nuestra hamburguesa estrella ahora en ${platform}! 🍔🔥 #${platform} #foodlover`,
    likes: Math.floor(Math.random() * 1000) + 50,
    commentsCount: Math.floor(Math.random() * 300) + 10,
    publishedAt: new Date(2025, 6, 19 - i).toISOString(),
    // ¡CORRECCIÓN! La estructura de los comentarios ahora coincide con el tipo Comment.
    comments: [
      { 
        id: `c-${i}-1`, 
        text: '¡Se ve absolutamente deliciosa!', 
        publishedAt: new Date().toISOString(),
        likes: Math.floor(Math.random() * 100),
        user: { 
          username: 'foodfanatic', 
          avatarUrl: 'https://placehold.co/40x40/EFEFEF/333333?text=FF' 
        }
      },
      { 
        id: `c-${i}-2`, 
        text: 'Necesito una de esas ahora mismo.', 
        publishedAt: new Date().toISOString(),
        likes: Math.floor(Math.random() * 100),
        user: { 
          username: 'hungry_dev', 
          avatarUrl: 'https://placehold.co/40x40/EFEFEF/333333?text=HD'
        }
      },
    ],
  }));
};

export const postService = {
  getPostsByPlatform: async (platform: SocialNetwork): Promise<Post[]> => {
    console.warn(`Usando datos mock para los posts de ${platform}. Conectar a la API real.`);
    return new Promise(resolve => setTimeout(() => resolve(generateMockPosts(platform, 12)), 500));
  },
};