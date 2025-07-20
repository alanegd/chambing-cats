import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Heart, Calendar } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import type { SortCriteria } from '../../types';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css'; 

/**
 * Barra de filtros que permite ordenar los posts por diferentes criterios.
 */
export const FilterBar = () => {
  const sortCriteria = useAppStore((state) => state.sortCriteria);
  const sortOrder = useAppStore((state) => state.sortOrder);
  const setSort = useAppStore((state) => state.setSort);
  const dateRange = useAppStore((state) => state.dateRange);
  const setDateRange = useAppStore((state) => state.setDateRange);

  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const SortArrow = ({ forCriteria }: { forCriteria: SortCriteria }) => {
    if (sortCriteria !== forCriteria) return null;
    return <span className="ml-1 text-blue-500 font-bold">{sortOrder === 'desc' ? '↓' : '↑'}</span>;
  };

  const displayDate =
    dateRange.from && dateRange.to
      ? `${format(dateRange.from, 'dd/MM/yy')} - ${format(dateRange.to, 'dd/MM/yy')}`
      : 'Seleccionar fecha';

  return (
    <div className="px-6 md:px-8 pb-4 flex flex-wrap items-center justify-between gap-4">
      <h2 className="text-2xl font-bold text-gray-700">Posts</h2>
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Filtro de fecha interactivo */}
      <div className="relative" ref={calendarRef}>
        <button
          onClick={() => setCalendarOpen(!isCalendarOpen)}
          className="flex items-center bg-gray-100 rounded-lg p-2 text-sm w-40 justify-center hover:bg-gray-200 transition-colors"
          aria-label="Filtrar por fecha"
        >
          <Calendar className="w-5 h-5 text-gray-500 mr-2" />
          <span>{displayDate}</span>
        </button>
        {isCalendarOpen && (
          <div className="calendar-popover absolute top-full right-0 mt-2 z-10">
            <DayPicker
              mode="range"
              selected={dateRange}
              onSelect={(range) =>
                setDateRange({
                  from: range?.from,
                  to: range?.to ?? undefined,
                })
              }
              numberOfMonths={1}
              defaultMonth={dateRange.from || new Date()}
            />
          </div>
        )}
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