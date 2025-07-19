import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { FilterBar } from '../components/features/FilterBar';
import { PostGrid } from '../components/features/PostGrid';
import { PostDetailView } from '../components/features/PostDetailView';

export const DashboardPage = () => {
  const fetchData = useAppStore(state => state.fetchData);
  const activeNetwork = useAppStore(state => state.activeNetwork);

  useEffect(() => {
    fetchData(activeNetwork);
  }, [activeNetwork, fetchData]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <Header />
          <FilterBar />
          <PostGrid />
        </main>
      </div>
      <PostDetailView />
    </div>
  );
};
