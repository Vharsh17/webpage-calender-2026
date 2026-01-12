import { useState, useEffect } from 'react';
import { Calendar } from './components/Calendar';
import { MonthNavigator } from './components/MonthNavigator';

// Month accent colors matching design
const MONTH_COLORS = {
  0: '#6B9B7F',  // January - soft green
  1: '#E77FA8',  // February - pink
  2: '#9B8BC9',  // March - purple
  3: '#F5A962',  // April - orange
  4: '#7FB3D5',  // May - blue
  5: '#E8A5A5',  // June - coral
  6: '#B8A58C',  // July - tan
  7: '#8FBAA6',  // August - mint
  8: '#D4A5A5',  // September - rose
  9: '#A89B7F',  // October - olive
  10: '#7B9CB5', // November - slate blue
  11: '#C9A5B8', // December - mauve
};

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export interface JournalEntry {
  date: string;
  content: string;
  showPreview: boolean;
}

export interface CalendarEvent {
  date: string;
  name: string;
  color: string;
  preview?: string;
}

export interface Habit {
  id: string;
  name: string;
  icon: string;
  dates: string[]; // dates when habit was tracked
}

export default function App() {
  const [currentMonth, setCurrentMonth] = useState(0); // January 2026
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);

  const handleAddJournal = (date: string, content: string, showPreview: boolean) => {
    setJournalEntries(prev => {
      const existing = prev.findIndex(e => e.date === date);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { date, content, showPreview };
        return updated;
      }
      return [...prev, { date, content, showPreview }];
    });
  };

  const handleAddEvent = (date: string, name: string, color: string, preview?: string) => {
    setEvents(prev => {
      const existing = prev.findIndex(e => e.date === date);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { date, name, color, preview };
        return updated;
      }
      return [...prev, { date, name, color, preview }];
    });
  };

  const handleAddHabit = (name: string, icon: string) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      icon,
      dates: []
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const handleToggleHabit = (habitId: string, date: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const hasDate = habit.dates.includes(date);
        return {
          ...habit,
          dates: hasDate 
            ? habit.dates.filter(d => d !== date)
            : [...habit.dates, date]
        };
      }
      return habit;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        {/* Month Title */}
        <h1 
          className="text-center mb-12 font-serif"
          style={{ 
            fontSize: '4.5rem',
            color: MONTH_COLORS[currentMonth],
            fontWeight: 400,
            letterSpacing: '-0.02em'
          }}
        >
          {MONTH_NAMES[currentMonth]} <span className="text-gray-400" style={{ fontSize: '3rem' }}>2026</span>
        </h1>

        {/* Calendar */}
        <Calendar
          year={2026}
          month={currentMonth}
          accentColor={MONTH_COLORS[currentMonth]}
          journalEntries={journalEntries}
          events={events}
          habits={habits}
          onAddJournal={handleAddJournal}
          onAddEvent={handleAddEvent}
          onAddHabit={handleAddHabit}
          onToggleHabit={handleToggleHabit}
        />
      </div>

      {/* Bottom Month Navigator */}
      <MonthNavigator
        currentMonth={currentMonth}
        monthNames={MONTH_NAMES}
        monthColors={MONTH_COLORS}
        onSelectMonth={setCurrentMonth}
      />
    </div>
  );
}
