import React, { useState, useMemo } from 'react';
import { X, Heart, MessageSquare, BrainCircuit, TrendingUp, Smile, Frown, Meh, ThumbsUp } from 'lucide-react';
import { format } from 'date-fns';
import { useAppStore } from '../store/useAppStore';
import type { CommentSentiment } from '../types/CommentSentiment';

type Tab = 'summary' | 'comments' | 'trends';
type CommentSort = 'latest' | 'likes';

export const PostDetailScreen = () => {
  const selectedPost = useAppStore((state) => state.selectedPost);
  const clearSelectedPost = useAppStore((state) => state.clearSelectedPost);
  const summary = useAppStore((state) => state.postSummary);
  const isLoading = useAppStore((state) => state.isAnalysisLoading);

  const [activeTab, setActiveTab] = useState<Tab>('summary');
  const [activeSentiment, setActiveSentiment] = useState<CommentSentiment | 'all'>('all');
  const [commentSort, setCommentSort] = useState<CommentSort>('latest');

  const filteredAndSortedComments = useMemo(() => {
    if (!selectedPost?.comments) return [];

    const filtered = selectedPost.comments.filter(comment => 
      activeSentiment === 'all' || comment.sentiment === activeSentiment
    );
    
    return [...filtered].sort((a, b) => {
      if (commentSort === 'likes') return b.likes - a.likes;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }, [selectedPost?.comments, activeSentiment, commentSort]);

  if (!selectedPost) return null;

  const TabButton = ({ tab, label, icon: Icon }: { tab: Tab, label: string, icon: React.ElementType }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
    >
      <Icon className="w-5 h-5 mr-2" />
      {label}
    </button>
  );

  const SentimentButton = ({ sentiment, label, icon: Icon }: { sentiment: CommentSentiment | 'all', label: string, icon: React.ElementType }) => (
     <button
      onClick={() => setActiveSentiment(sentiment)}
      className={`px-3 py-1 text-xs rounded-full flex items-center transition-all ${activeSentiment === sentiment ? 'bg-gray-800 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
    >
      <Icon className="w-4 h-4 mr-1.5" />
      {label}
    </button>
  );

  const renderContent = () => {
    if (isLoading) {
      return <div className="p-8 text-center">Cargando análisis de IA...</div>;
    }

    switch (activeTab) {
      case 'summary':
        return (
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-bold">Resumen con IA</h3>
            <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg border">{summary || "No hay resumen disponible."}</p>
          </div>
        );
      case 'comments':
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2">
                <SentimentButton sentiment="all" label="Todos" icon={MessageSquare} />
                <SentimentButton sentiment="satisfied" label="Satisfecho" icon={Smile} />
                <SentimentButton sentiment="neutral" label="Regular" icon={Meh} />
                <SentimentButton sentiment="unsatisfied" label="Insatisfecho" icon={Frown} />
              </div>
              <select onChange={(e) => setCommentSort(e.target.value as CommentSort)} value={commentSort} className="text-sm border-gray-300 rounded-md">
                <option value="latest">Más recientes</option>
                <option value="likes">Más populares</option>
              </select>
            </div>
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {filteredAndSortedComments.map(comment => (
                <div key={comment.id} className="flex items-start">
                  <img src={comment.user.avatarUrl} alt={comment.user.username} className="w-10 h-10 rounded-full mr-4" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold">{comment.user.username}</p>
                      <span className="text-xs text-gray-500">{format(new Date(comment.publishedAt), 'dd/MM/yy, HH:mm')}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                    <div className="flex items-center text-gray-500 mt-2 text-xs">
                      <ThumbsUp className="w-4 h-4 mr-1" /> {comment.likes}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

    }
  };

  return (
    // ¡CORRECCIÓN! Se cambian las clases del fondo aquí.
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden">
        <button onClick={clearSelectedPost} className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors z-20"><X size={24} /></button>
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-900 flex items-center justify-center relative">
          <img src={selectedPost.mediaUrl} alt="Vista detallada del post" className="object-contain w-full h-full" />
          <div className="absolute bottom-4 left-4 flex space-x-4 bg-black bg-opacity-50 text-white p-2 rounded-lg">
            <div className="flex items-center"><Heart size={16} className="mr-1.5" /> {selectedPost.likes.toLocaleString()}</div>
            <div className="flex items-center"><MessageSquare size={16} className="mr-1.5" /> {selectedPost.commentsCount.toLocaleString()}</div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="p-4 border-b flex space-x-2">
            <TabButton tab="summary" label="Resumen IA" icon={BrainCircuit} />
            <TabButton tab="comments" label="Comentarios" icon={MessageSquare} />
            <TabButton tab="trends" label="Tendencias" icon={TrendingUp} />
          </div>
          <div className="flex-grow overflow-y-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};