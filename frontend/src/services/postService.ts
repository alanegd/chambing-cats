import apiClient from '../lib/apiClient';
import type { Post } from '../types/Post';
import type { SocialNetwork } from '../types/SocialNetwork';
import type { Comment as PostComment } from '../types/Comment';

// --- Implementación con Backend Real (descomentar cuando esté listo) ---
/*
export const postService = {
  getPostsByPlatform: async (platform: SocialNetwork): Promise<Post[]> => {
    // La plataforma se pasaría como un query param en la URL
    return apiClient<Post[]>(`/posts?platform=${platform}`);
  },
};
*/


// --- Implementación Mock para desarrollo (eliminar cuando el backend esté listo) ---
const generateMockPosts = (platform: SocialNetwork, count: number): Post[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${platform}-${i + 1}`,
    platform,
    imageUrl: `https://placehold.co/400x400/000000/FFFFFF?text=${platform.charAt(0).toUpperCase()}+Post+${i + 1}`,
    caption: `¡Nuestra hamburguesa estrella ahora en ${platform}! 🍔🔥 #${platform} #foodlover`,
    likes: Math.floor(Math.random() * 1000) + 50,
    commentsCount: Math.floor(Math.random() * 300) + 10,
    publishedAt: new Date(2025, 6, 19 - i).toISOString(),
    // Usamos el tipo 'PostComment' para asegurar que TypeScript entienda a qué nos referimos.
    comments: [
      { id: `c-${i}-1`, author: 'foodfanatic', avatarUrl: 'https://placehold.co/40x40/EFEFEF/333333?text=FF', text: '¡Se ve absolutamente deliciosa!', timestamp: new Date().toISOString() },
      { id: `c-${i}-2`, author: 'hungry_dev', avatarUrl: 'https://placehold.co/40x40/EFEFEF/333333?text=HD', text: 'Necesito una de esas ahora mismo.', timestamp: new Date().toISOString() },
    ] as PostComment[], // Hacemos un type assertion para confirmar el tipo del array.
  }));
};

export const postService = {
  getPostsByPlatform: async (platform: SocialNetwork): Promise<Post[]> => {
    console.warn(`Usando datos mock para los posts de ${platform}. Conectar a la API real.`);
    return new Promise(resolve => setTimeout(() => resolve(generateMockPosts(platform, 12)), 500));
  },
};