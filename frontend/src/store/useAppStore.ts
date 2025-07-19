import { create } from "zustand";
import type { 
  Post, 
  SocialNetwork, 
  UserProfile, 
  SortCriteria, 
  SortOrder 
} from '../types';
import { postService } from "../services/postService";
import { profileService } from "../services/profileService";

interface AppState {
  activeNetwork: SocialNetwork;
  posts: Post[];
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  sortCriteria: SortCriteria;
  sortOrder: SortOrder;
  selectedPost: Post | null;

  setNetwork: (network: SocialNetwork) => void;
  fetchData: (network: SocialNetwork) => Promise<void>;
  setSort: (criteria: SortCriteria) => void;
  selectPost: (post: Post | null) => void;

  clearSelectedPost: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  activeNetwork: 'instagram',
  posts: [],
  profile: null,
  isLoading: true,
  error: null,
  sortCriteria: 'publishedAt',
  sortOrder: 'desc',
  selectedPost: null,

  setNetwork: (network: SocialNetwork) => {
    if (get().activeNetwork === network && get().posts.length > 0) return;
    set({ activeNetwork: network, selectedPost: null, posts: [] });
    get().fetchData(network);
  },

  fetchData: async (network: SocialNetwork) => {
    set({ isLoading: true, error: null });
    try {
      const [profileData, postsData] = await Promise.all([
        profileService.getProfile(),
        postService.getPostsByPlatform(network)
      ]);
      set({ profile: profileData, posts: postsData, isLoading: false });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar los datos.';
      set({ error: errorMessage, isLoading: false });
    }
  },

  setSort: (criteria: SortCriteria) => {
    set(state => ({
      sortCriteria: criteria,
      sortOrder: state.sortCriteria === criteria && state.sortOrder === 'desc' ? 'asc' : 'desc',
    }));
  },
  
  selectPost: (post: Post | null) => {
    set({ selectedPost: post });
  },

  // ¡CORRECCIÓN 2/2! Implementar la lógica de la acción.
  clearSelectedPost: () => {
    set({ selectedPost: null });
  }
}));