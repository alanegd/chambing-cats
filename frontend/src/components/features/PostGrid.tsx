import { useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { PostCard } from './PostCard';

export const PostGrid = () => {
  const posts = useAppStore(state => state.posts);
  const isLoading = useAppStore(state => state.isLoading);
  const sortCriteria = useAppStore(state => state.sortCriteria);
  const sortOrder = useAppStore(state => state.sortOrder);
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      const valA = a[sortCriteria];
      const valB = b[sortCriteria];
      
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [posts, sortCriteria, sortOrder]);

  // Muestra esqueletos de carga
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-6 md:p-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  // Muestra la cuadrícula de posts
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-6 md:p-8">
      {sortedPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};