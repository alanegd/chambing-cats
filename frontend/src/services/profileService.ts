import type { UserProfile } from '../types/UserProfile';

// --- Implementación con Backend Real (descomentar cuando esté listo) ---
/*
export const profileService = {
  getProfile: async (): Promise<UserProfile> => {
    return apiClient<UserProfile>('/profile');
  },
};
*/


// --- Implementación Mock para desarrollo (eliminar cuando el backend esté listo) ---
const MOCK_USER_PROFILE: UserProfile = {
  username: '@burger_shack',
  totalPosts: 12,
  totalLikes: 150,
  totalComments: 150,
};

export const profileService = {
  getProfile: async (): Promise<UserProfile> => {
    console.warn("Usando datos mock para el perfil. Conectar a la API real.");
    return new Promise(resolve => setTimeout(() => resolve(MOCK_USER_PROFILE), 200));
  },
};
