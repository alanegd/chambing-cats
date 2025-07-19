// src/components/features/PostDetailView.tsx
import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { X, Heart, MessageSquare } from 'lucide-react';

/**
 * Muestra una vista detallada de un post, incluyendo la imagen,
 * los comentarios y las estadísticas.
 */
export const PostDetailView = () => {
  // ¡CORRECCIÓN!
  // Se seleccionan los valores y acciones de forma individual para
  // evitar el bucle de renderizado infinito.
  const selectedPost = useAppStore((state) => state.selectedPost);
  const clearSelectedPost = useAppStore((state) => state.clearSelectedPost);

  if (!selectedPost) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden">
        {/* Botón para cerrar la vista detallada */}
        <button
          onClick={clearSelectedPost}
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors z-10"
          aria-label="Cerrar vista detallada"
        >
          <X size={24} />
        </button>

        {/* Sección de la imagen */}
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-900 flex items-center justify-center">
          <img
            src={selectedPost.mediaUrl}
            alt="Vista detallada del post"
            className="object-contain w-full h-full"
          />
        </div>

        {/* Sección de detalles y comentarios */}
        <div className="w-full md:w-1/2 flex flex-col p-6">
          <p className="text-gray-700 text-sm mb-4 leading-relaxed">{selectedPost.caption}</p>

          <div className="flex items-center space-x-6 border-b pb-4 mb-4">
            <div className="flex items-center text-red-500">
              <Heart size={20} className="mr-2" />
              <span className="font-semibold">{selectedPost.likes.toLocaleString()}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MessageSquare size={20} className="mr-2" />
              <span className="font-semibold">{selectedPost.commentsCount.toLocaleString()}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-bold mb-3">Comentarios</h3>
          
          <div className="flex-grow overflow-y-auto space-y-4 pr-2">
            {selectedPost.comments.map(comment => (
              <div key={comment.id} className="flex items-start">
                <img src={comment.user.avatarUrl} alt={comment.user.username} className="w-8 h-8 rounded-full mr-3" />
                <div>
                  <p className="text-sm">
                    <span className="font-bold">{comment.user.username}</span>
                    <span className="text-gray-600 ml-2">{comment.text}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};