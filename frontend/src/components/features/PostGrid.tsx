
import { useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { PostCard } from './PostCard';

export const PostGrid = () => {
  const posts = useAppStore(state => state.posts);
  const isLoading = useAppStore(state => state.isLoading);
  const sortCriteria = useAppStore(state => state.sortCriteria);
  const sortOrder = useAppStore(state => state.sortOrder);

  const dateRange = useAppStore(state => state.dateRange);

  const filteredAndSortedPosts = useMemo(() => {

    const filtered = posts.filter(post => {
      if (!dateRange.from || !dateRange.to) return true; 
      const postDate = new Date(post.publishedAt);

      postDate.setHours(0, 0, 0, 0);
      const fromDate = new Date(dateRange.from);
      fromDate.setHours(0, 0, 0, 0);
      const toDate = new Date(dateRange.to);
      toDate.setHours(0, 0, 0, 0);
      
      return postDate >= fromDate && postDate <= toDate;
    });

    // 2. Ordenar el resultado filtrado
    return [...filtered].sort((a, b) => {
      const valA = a[sortCriteria];
      const valB = b[sortCriteria];
      
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [posts, sortCriteria, sortOrder, dateRange]); // <- Añade dateRange a las dependencias

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-6 md:p-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (filteredAndSortedPosts.length === 0) {
    return <p className="text-center text-gray-500 p-8">No hay posts en el rango de fechas seleccionado.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-6 md:p-8">
      {filteredAndSortedPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};