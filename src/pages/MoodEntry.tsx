import { useEffect, useState } from 'react';
import { useCheckInStore } from '../contexts/useCheckInStore';
import { useMoodStore } from '../contexts/useMoodStore';

const moodEmojis = ['\uD83D\uDE22', '\uD83D\uDE41', '\uD83D\uDE10', '\uD83D\uDE42', '\uD83D\uDE04'];
const moodLabels = ['Very sad', 'Sad', 'Neutral', 'Happy', 'Very happy'];

export default function MoodEntry() {
  const { setLastPrompt } = useCheckInStore();
  const { addEntry } = useMoodStore();
  const [mood, setMood] = useState(3);
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    addEntry({ mood, notes });
    setNotes('');
  };

  useEffect(() => {
    setLastPrompt(Date.now());
  }, [setLastPrompt]);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Mood Entry</h1>

      <div>
        <p className="mb-2">How are you feeling today?</p>
        <div className="flex items-center gap-3">
          {moodEmojis.map((emoji, index) => (
            <button
              key={emoji}
              onClick={() => setMood(index + 1)}
              aria-label={moodLabels[index]}
              className={
                'w-12 h-12 flex items-center justify-center rounded-full border text-3xl transition transform focus:outline-none focus:ring-2 focus:ring-primary ' +
                (mood === index + 1 ? 'scale-110' : 'opacity-50')
              }
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>


      <div>
        <label htmlFor="notes" className="block mb-1">
          Notes (optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 border rounded bg-creamWhite text-indigo dark:text-creamWhite"
          rows={4}
        />
      </div>

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-primary-dark text-white rounded"
      >
        Save Entry
      </button>
    </div>
  );
}
