import { BookOpen, Calendar, CheckSquare } from 'lucide-react';
import type { JournalEntry, CalendarEvent, Habit } from '../App';

interface DayCardProps {
  day: number;
  date: string;
  journal?: JournalEntry;
  event?: CalendarEvent;
  trackedHabits: Habit[];
  onClick: () => void;
}

export function DayCard({ day, journal, event, trackedHabits, onClick }: DayCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white aspect-[4/3] p-3 cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg border border-gray-200 hover:border-gray-300 rounded-lg relative flex flex-col"
      style={{
        backgroundColor: event ? event.color : 'white'
      }}
    >
      {/* Top Section: Date & Event */}
      <div className="flex-shrink-0">
        {/* Day number */}
        <div className="text-sm font-semibold text-gray-900 mb-3">
          {day}
        </div>

        {/* Event - Primary Content */}
        {event && (
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Calendar 
                className="w-3.5 h-3.5 flex-shrink-0" 
                style={{ color: event.color === '#A73121' ? '#fff' : '#333' }} 
              />
              <div 
                className="text-[13px] font-medium leading-tight truncate"
                style={{ color: event.color === '#A73121' ? '#fff' : '#1a1a1a' }}
              >
                {event.name}
              </div>
            </div>
            {event.preview && (
              <div 
                className="text-[11px] leading-snug line-clamp-1 pl-5"
                style={{ color: event.color === '#A73121' ? 'rgba(255,255,255,0.9)' : '#666' }}
              >
                {event.preview}
              </div>
            )}
          </div>
        )}

        {/* Habits - if present, show below event */}
        {trackedHabits.length > 0 && (
          <div className={`flex items-center gap-1 ${event ? 'mt-2' : ''}`}>
            <CheckSquare className="w-3 h-3 text-gray-500" />
            <div className="text-[10px] text-gray-500 font-medium">
              {trackedHabits.length} habit{trackedHabits.length > 1 ? 's' : ''}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Section: Journal Preview - Secondary Content */}
      {journal && journal.showPreview && (
        <div className="mt-auto pt-2">
          <div className="flex items-start gap-1">
            <BookOpen className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
            <div className="text-[10px] text-gray-500 leading-snug line-clamp-1 opacity-80">
              {journal.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
