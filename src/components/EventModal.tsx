import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { CalendarEvent } from '../App';

interface EventModalProps {
  event?: CalendarEvent;
  onSave: (name: string, color: string, preview?: string) => void;
  onClose: () => void;
}

const EVENT_COLORS = [
  { name: 'Mint Green', value: '#B5E7D3' },
  { name: 'Deep Red', value: '#A73121' },
  { name: 'Soft Blue', value: '#A8D5E2' },
  { name: 'Lavender', value: '#D4C5E2' },
  { name: 'Peach', value: '#FFD4B2' },
  { name: 'Rose', value: '#F4C2C2' },
];

export function EventModal({ event, onSave, onClose }: EventModalProps) {
  const [name, setName] = useState(event?.name || '');
  const [color, setColor] = useState(event?.color || EVENT_COLORS[0].value);
  const [preview, setPreview] = useState(event?.preview || '');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleSave = () => {
    if (name.trim()) {
      onSave(name, color, preview || undefined);
      onClose();
    }
  };

  const selectedColor = EVENT_COLORS.find(c => c.value === color) || EVENT_COLORS[0];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-serif mb-2 text-gray-900">
          Event of the day
        </h2>
        <p className="text-sm text-gray-600">
          Mark the day with a memory or an event!
        </p>
      </div>

      {/* Event name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g: Birthday, Party, Achievement"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
        />
      </div>

      {/* Event preview/description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event details (optional)
        </label>
        <input
          type="text"
          value={preview}
          onChange={(e) => setPreview(e.target.value)}
          placeholder="Add a short description..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
        />
      </div>

      {/* Event color */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event colour
        </label>
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-left text-sm text-gray-500 hover:border-gray-300 transition-colors flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded border border-gray-300"
              style={{ backgroundColor: color }}
            />
            <span>{selectedColor.name}</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>

        {showColorPicker && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-2">
            {EVENT_COLORS.map((c) => (
              <button
                key={c.value}
                onClick={() => {
                  setColor(c.value);
                  setShowColorPicker(false);
                }}
                className="w-full px-3 py-2 hover:bg-gray-50 rounded flex items-center gap-2 text-sm"
              >
                <div 
                  className="w-4 h-4 rounded border border-gray-300"
                  style={{ backgroundColor: c.value }}
                />
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Save button */}
      <div className="pt-2">
        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Event
        </button>
      </div>
    </div>
  );
}
