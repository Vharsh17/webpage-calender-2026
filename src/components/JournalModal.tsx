import { useState } from 'react';
import type { JournalEntry } from '../App';

interface JournalModalProps {
  journal?: JournalEntry;
  onSave: (content: string, showPreview: boolean) => void;
  onClose: () => void;
}

export function JournalModal({ journal, onSave, onClose }: JournalModalProps) {
  const [content, setContent] = useState(journal?.content || '');
  const [showPreview, setShowPreview] = useState(journal?.showPreview ?? false);

  const handleSave = () => {
    if (content.trim()) {
      onSave(content, showPreview);
      onClose();
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-serif mb-2 text-gray-900">
          Thoughts for the day...
        </h2>
        <p className="text-sm text-gray-600">
          Enter your thoughts for the day, positive affirmations or reminders
        </p>
      </div>

      {/* Text area */}
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full h-40 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none text-sm"
        />
      </div>

      {/* Checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="show-preview"
          checked={showPreview}
          onChange={(e) => setShowPreview(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
        />
        <label htmlFor="show-preview" className="text-sm text-gray-700 cursor-pointer">
          Show entry preview on the calendar
        </label>
      </div>

      {/* Save button */}
      <div className="pt-2">
        <button
          onClick={handleSave}
          disabled={!content.trim()}
          className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Entry
        </button>
      </div>
    </div>
  );
}
