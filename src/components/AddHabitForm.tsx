import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AddHabitFormProps {
  onAdd: (name: string, icon: string) => void;
  onBack: () => void;
}

const HABIT_ICONS = [
  { name: 'Book', icon: '📖' },
  { name: 'Dumbbell', icon: '🏋️' },
  { name: 'Running', icon: '🏃' },
  { name: 'Water', icon: '💧' },
  { name: 'Meditation', icon: '🧘' },
  { name: 'Sleep', icon: '😴' },
  { name: 'Food', icon: '🥗' },
  { name: 'Writing', icon: '✍️' },
  { name: 'Music', icon: '🎵' },
  { name: 'Art', icon: '🎨' },
];

export function AddHabitForm({ onAdd, onBack }: AddHabitFormProps) {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState(HABIT_ICONS[0].icon);
  const [showIconPicker, setShowIconPicker] = useState(false);

  const handleAdd = () => {
    if (name.trim()) {
      onAdd(name, icon);
    }
  };

  const selectedIcon = HABIT_ICONS.find(h => h.icon === icon) || HABIT_ICONS[0];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-serif mb-2 text-gray-900">
          Add new habit
        </h2>
        <p className="text-sm text-gray-600">
          Create a habit you would like to track
        </p>
      </div>

      {/* Habit name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Habit
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Eat well, exercise, read book"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
        />
      </div>

      {/* Icon selector */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select an icon
        </label>
        <button
          onClick={() => setShowIconPicker(!showIconPicker)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-left text-sm hover:border-gray-300 transition-colors flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{icon}</span>
            <span className="text-gray-700">{selectedIcon.name}</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>

        {showIconPicker && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-2 max-h-60 overflow-y-auto">
            {HABIT_ICONS.map((h) => (
              <button
                key={h.icon}
                onClick={() => {
                  setIcon(h.icon);
                  setShowIconPicker(false);
                }}
                className="w-full px-3 py-2 hover:bg-gray-50 rounded flex items-center gap-2 text-sm"
              >
                <span className="text-lg">{h.icon}</span>
                <span>{h.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          Back to habits
        </button>
        <button
          onClick={handleAdd}
          disabled={!name.trim()}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add habit
        </button>
      </div>
    </div>
  );
}
