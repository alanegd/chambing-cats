import { MessageSquare, Heart, ArrowUpDown, Calendar } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import type { SortCriteria } from '../../types';

/**
 * Barra de filtros que permite ordenar los posts por diferentes criterios.
 */
export const FilterBar = () => {
  const sortCriteria = useAppStore((state) => state.sortCriteria);
  const sortOrder = useAppStore((state) => state.sortOrder);
  const setSort = useAppStore((state) => state.setSort);

  const SortArrow = ({ forCriteria }: { forCriteria: SortCriteria }) => {
    if (sortCriteria !== forCriteria) return null;
    return <span className="ml-1 text-blue-500 font-bold">{sortOrder === 'desc' ? '↓' : '↑'}</span>;
  };

  return (
    <div className="px-6 md:px-8 pb-4 flex flex-wrap items-center justify-between gap-4">
      <h2 className="text-2xl font-bold text-gray-700">Posts</h2>
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* El filtro de fecha es actualmente decorativo */}
        <div className="flex items-center bg-gray-100 rounded-lg p-2">
          <Calendar className="w-5 h-5 text-gray-500 mr-2" />
          <input 
            type="text" 
            defaultValue="19/07/2025" 
            className="bg-transparent text-sm w-24 focus:outline-none"
            aria-label="Filtrar por fecha"
          />
        </div>
        
        {/* Botones de ordenamiento */}
        <button onClick={() => setSort('commentsCount')} className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center" aria-label="Ordenar por comentarios">
          <MessageSquare className="w-5 h-5 text-gray-600" /> <SortArrow forCriteria="commentsCount" />
        </button>
        <button onClick={() => setSort('likes')} className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center" aria-label="Ordenar por likes">
          <Heart className="w-5 h-5 text-gray-600" /> <SortArrow forCriteria="likes" />
        </button>
      </div>
    </div>
  );
};