import { useState, useEffect } from "react";
import { Calendar } from "./components/Calendar";
import { MonthNavigator } from "./components/MonthNavigator";
import { supabase } from "./supabase/client";
import Auth from "./Auth";


// Month accent colors
const MONTH_COLORS: Record<number, string> = {
  0: "#6B9B7F",
  1: "#E77FA8",
  2: "#9B8BC9",
  3: "#F5A962",
  4: "#7FB3D5",
  5: "#E8A5A5",
  6: "#B8A58C",
  7: "#8FBAA6",
  8: "#D4A5A5",
  9: "#A89B7F",
  10: "#7B9CB5",
  11: "#C9A5B8",
};

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
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
  dates: string[];
}

export default function App() {
  const [currentMonth, setCurrentMonth] = useState(0);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [session, setSession] = useState<any>(null);

  // --- AUTH SESSION ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- HANDLERS (DO NOT PASS SETTERS DIRECTLY) ---
  const handleAddJournal = (
    date: string,
    content: string,
    showPreview: boolean
  ) => {
    setJournalEntries((prev) => {
      const index = prev.findIndex((e) => e.date === date);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { date, content, showPreview };
        return updated;
      }
      return [...prev, { date, content, showPreview }];
    });
  };

  const handleAddEvent = (
    date: string,
    name: string,
    color: string,
    preview?: string
  ) => {
    setEvents((prev) => {
      const index = prev.findIndex((e) => e.date === date);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { date, name, color, preview };
        return updated;
      }
      return [...prev, { date, name, color, preview }];
    });
  };

  const handleAddHabit = (name: string, icon: string) => {
    setHabits((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name,
        icon,
        dates: [],
      },
    ]);
  };

  const handleToggleHabit = (habitId: string, date: string) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              dates: habit.dates.includes(date)
                ? habit.dates.filter((d) => d !== date)
                : [...habit.dates, date],
            }
          : habit
      )
    );
  };

  // --- AUTH GATE ---
  if (!session) {
    return <Auth />;
  }

  // --- MAIN UI ---
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <h1
          className="text-center mb-12 font-serif" 
          style={{
            fontSize: "4.5rem",
            color: MONTH_COLORS[currentMonth],
            fontWeight: 400,
            letterSpacing: "-0.02em",
          }}
        >
          {MONTH_NAMES[currentMonth]}{" "}
          <span className="text-gray-400" style={{ fontSize: "3rem" }}>
            2026
          </span>
        </h1>

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

      <MonthNavigator
        currentMonth={currentMonth}
        monthNames={MONTH_NAMES}
        monthColors={MONTH_COLORS}
        onSelectMonth={setCurrentMonth}
      />
    </div>
  );
}
