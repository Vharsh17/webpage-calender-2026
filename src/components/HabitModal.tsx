import { useState } from 'react';
import { Plus } from 'lucide-react';
import { AddHabitForm } from './AddHabitForm';
import type { Habit } from '../App';

interface HabitModalProps {
  habits: Habit[];
  trackedHabits: Habit[];
  onAddHabit: (name: string, icon: string) => void;
  onToggleHabit: (habitId: string) => void;
}

export function HabitModal({ habits, trackedHabits, onAddHabit, onToggleHabit }: HabitModalProps) {
  const [showAddForm, setShowAddForm] = useState(false);

  if (showAddForm) {
    return (
      <AddHabitForm
        onAdd={(name, icon) => {
          onAddHabit(name, icon);
          setShowAddForm(false);
        }}
        onBack={() => setShowAddForm(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-serif mb-2 text-gray-900">
          Track your habits
        </h2>
        <p className="text-sm text-gray-600">
          Create habits and track them!
        </p>
      </div>

      {/* My Habits section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900">My Habits</h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add a habit
          </button>
        </div>

        {habits.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500 mb-4">
              Start tracking your goals today!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {habits.map((habit) => {
              const isTracked = trackedHabits.some(h => h.id === habit.id);
              return (
                <div
                  key={habit.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{habit.icon}</span>
                    <span className="text-sm font-medium text-gray-900">{habit.name}</span>
                  </div>
                  <button
                    onClick={() => onToggleHabit(habit.id)}
                    className={`px-3 py-1 text-xs font-medium rounded ${
                      isTracked
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isTracked ? 'Tracked' : 'Track'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
