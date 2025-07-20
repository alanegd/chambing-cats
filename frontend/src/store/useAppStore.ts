import { create } from "zustand";
import type {
  Post,
  SocialNetwork,
  UserProfile,
  SortCriteria,
  SortOrder,
  DateRange,
  PostComment // Asegúrate de importar Comment si está en otro archivo
} from '../types';
import { postService } from "../services/postService";
import { profileService } from "../services/profileService";
// ¡Importante! Importa el nuevo servicio de análisis que creamos.
import { analysisService } from "../services/analysisService";

interface AppState {
  activeNetwork: SocialNetwork;
  posts: Post[];
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  sortCriteria: SortCriteria;
  sortOrder: SortOrder;
  selectedPost: Post | null;
  dateRange: DateRange;

  // --- ¡NUEVO ESTADO PARA EL ANÁLISIS! ---
  postSummary: string | null;
  isAnalysisLoading: boolean;

  setNetwork: (network: SocialNetwork) => void;
  fetchData: (network: SocialNetwork) => Promise<void>;
  setSort: (criteria: SortCriteria) => void;
  selectPost: (post: Post | null) => void;
  clearSelectedPost: () => void;
  setDateRange: (range: DateRange) => void;
  
  // --- ¡NUEVAS ACCIONES PARA EL ANÁLISIS! ---
  fetchPostAnalysis: (postId: string) => Promise<void>;
  fetchCommentSentiments: () => Promise<void>;
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
  dateRange: { from: undefined, to: undefined },

  // --- ¡ESTADO INICIAL PARA EL ANÁLISIS! ---
  postSummary: null,
  isAnalysisLoading: false,

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
    set({ 
      selectedPost: post, 
      postSummary: null,

      isAnalysisLoading: !!post 
    });

    if (post) {
      get().fetchPostAnalysis(post.id);
      get().fetchCommentSentiments();
    }
  },

  clearSelectedPost: () => {

    set({ selectedPost: null, postSummary: null });
  },

  setDateRange: (range: DateRange) => {
    set({ dateRange: range });
  },

  fetchPostAnalysis: async (postId: string) => {
    try {
      const [summary] = await Promise.all([
        analysisService.getPostSummary(postId),

      ]);
      set({ postSummary: summary, isAnalysisLoading: false });
    } catch (error) {
      console.error("Error fetching post analysis:", error);
      set({ isAnalysisLoading: false });
    }
  },
  
  fetchCommentSentiments: async () => {
    const post = get().selectedPost;
    if (!post || post.comments.length === 0) {

        if (get().isAnalysisLoading) {
            set({ isAnalysisLoading: false });
        }
        return;
    }

    const commentIds = post.comments.map(c => c.id);
    const sentiments = await analysisService.getCommentSentiments(commentIds);

    const commentsWithSentiment = post.comments.map(comment => ({
      ...comment,
      sentiment: sentiments[comment.id]
    }));

    set(state => ({
      selectedPost: state.selectedPost ? { ...state.selectedPost, comments: commentsWithSentiment } : null
    }));
  }
}));