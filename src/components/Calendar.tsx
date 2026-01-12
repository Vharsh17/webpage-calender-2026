import { useState } from 'react';
import { DayCard } from './DayCard';
import { DayModal } from './DayModal';
import type { JournalEntry, CalendarEvent, Habit } from '../App';

interface CalendarProps {
  year: number;
  month: number;
  accentColor: string;
  journalEntries: JournalEntry[];
  events: CalendarEvent[];
  habits: Habit[];
  onAddJournal: (date: string, content: string, showPreview: boolean) => void;
  onAddEvent: (date: string, name: string, color: string, preview?: string) => void;
  onAddHabit: (name: string, icon: string) => void;
  onToggleHabit: (habitId: string, date: string) => void;
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function Calendar({
  year,
  month,
  accentColor,
  journalEntries,
  events,
  habits,
  onAddJournal,
  onAddEvent,
  onAddHabit,
  onToggleHabit
}: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (day: number) => {
    const monthStr = (month + 1).toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    return `${year}-${monthStr}-${dayStr}`;
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const days = [];

  // Empty cells before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(
      <div key={`empty-${i}`} className="aspect-[4/3]" />
    );
  }

  // Actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = formatDate(day);
    const journal = journalEntries.find(e => e.date === date);
    const event = events.find(e => e.date === date);
    const trackedHabits = habits.filter(h => h.dates.includes(date));

    days.push(
      <DayCard
        key={date}
        day={day}
        date={date}
        journal={journal}
        event={event}
        trackedHabits={trackedHabits}
        onClick={() => setSelectedDate(date)}
      />
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg p-4">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-4 mb-4">
          {DAYS_OF_WEEK.map(day => (
            <div 
              key={day}
              className="py-3 text-center text-sm font-medium text-gray-600"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-4">
          {days}
        </div>
      </div>

      {/* Modal */}
      {selectedDate && (
        <DayModal
          date={selectedDate}
          accentColor={accentColor}
          journal={journalEntries.find(e => e.date === selectedDate)}
          event={events.find(e => e.date === selectedDate)}
          habits={habits}
          trackedHabits={habits.filter(h => h.dates.includes(selectedDate))}
          onClose={() => setSelectedDate(null)}
          onSaveJournal={(content, showPreview) => onAddJournal(selectedDate, content, showPreview)}
          onSaveEvent={(name, color, preview) => onAddEvent(selectedDate, name, color, preview)}
          onAddHabit={onAddHabit}
          onToggleHabit={(habitId) => onToggleHabit(habitId, selectedDate)}
        />
      )}
    </>
  );
}