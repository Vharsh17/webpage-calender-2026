import { useState } from 'react';
import { X, BookOpen, Calendar, CheckSquare } from 'lucide-react';
import { JournalModal } from './JournalModal';
import { EventModal } from './EventModal';
import { HabitModal } from './HabitModal';
import type { JournalEntry, CalendarEvent, Habit } from '../App';

interface DayModalProps {
  date: string;
  accentColor: string;
  journal?: JournalEntry;
  event?: CalendarEvent;
  habits: Habit[];
  trackedHabits: Habit[];
  onClose: () => void;
  onSaveJournal: (content: string, showPreview: boolean) => void;
  onSaveEvent: (name: string, color: string, preview?: string) => void;
  onAddHabit: (name: string, icon: string) => void;
  onToggleHabit: (habitId: string) => void;
}

type ModalType = 'journal' | 'event' | 'habit';

export function DayModal({
  date,
  accentColor,
  journal,
  event,
  habits,
  trackedHabits,
  onClose,
  onSaveJournal,
  onSaveEvent,
  onAddHabit,
  onToggleHabit
}: DayModalProps) {
  const [modalType, setModalType] = useState<ModalType>('journal');

  const formatDateDisplay = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {formatDateDisplay(date)}
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="px-8 py-6">
          {modalType === 'journal' && (
            <JournalModal
              journal={journal}
              onSave={onSaveJournal}
              onClose={onClose}
            />
          )}
          {modalType === 'event' && (
            <EventModal
              event={event}
              onSave={onSaveEvent}
              onClose={onClose}
            />
          )}
          {modalType === 'habit' && (
            <HabitModal
              habits={habits}
              trackedHabits={trackedHabits}
              onAddHabit={onAddHabit}
              onToggleHabit={onToggleHabit}
            />
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="px-8 pb-6 flex items-center justify-center gap-4">
          <button
            onClick={() => setModalType('journal')}
            className={`p-3 rounded-lg transition-colors ${
              modalType === 'journal'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <BookOpen className="w-5 h-5" />
          </button>
          <button
            onClick={() => setModalType('event')}
            className={`p-3 rounded-lg transition-colors ${
              modalType === 'event'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Calendar className="w-5 h-5" />
          </button>
          <button
            onClick={() => setModalType('habit')}
            className={`p-3 rounded-lg transition-colors ${
              modalType === 'habit'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <CheckSquare className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
