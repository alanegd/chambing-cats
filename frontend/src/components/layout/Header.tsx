// src/components/layout/Header.tsx
import { useAppStore } from '../../store/useAppStore';

export const Header = () => {
  // ¡CORRECCIÓN! Seleccionamos cada valor del store por separado.
  const profile = useAppStore(state => state.profile);
  const isLoading = useAppStore(state => state.isLoading);

  if (isLoading || !profile) {
    return (
      <header className="p-6 md:p-8">
        <div className="animate-pulse flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="h-10 bg-gray-200 rounded w-1/3 mb-4 sm:mb-0"></div>
          <div className="flex items-center space-x-6">
            <div className="h-12 bg-gray-200 rounded w-16"></div>
            <div className="h-12 bg-gray-200 rounded w-16"></div>
            <div className="h-12 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{profile.username}</h1>
        <div className="flex items-center space-x-6 mt-4 sm:mt-0">
          <div className="text-center">
            <p className="font-bold text-lg text-gray-900">{profile.totalPosts}</p>
            <p className="text-sm text-gray-500">Posts</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-lg text-gray-900">{profile.totalLikes}</p>
            <p className="text-sm text-gray-500">Likes</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-lg text-gray-900">{profile.totalComments}</p>
            <p className="text-sm text-gray-500">Comments</p>
          </div>
        </div>
      </div>
    </header>
  );
};