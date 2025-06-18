import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useCheckInStore } from '../contexts/useCheckInStore';
import { useMoodStore } from '../contexts/useMoodStore';

const moodEmojis = ['\uD83D\uDE22', '\uD83D\uDE41', '\uD83D\uDE10', '\uD83D\uDE42', '\uD83D\uDE04'];
const moodLabels = ['Very sad', 'Sad', 'Neutral', 'Happy', 'Very happy'];

export default function MoodEntry() {
  const { setLastPrompt } = useCheckInStore();
  const { addEntry } = useMoodStore();
  const [mood, setMood] = useState(3);
  const [notes, setNotes] = useState('');
  const [rows, setRows] = useState(1);
  const [saved, setSaved] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleSave = () => {
    addEntry({ mood, notes });
    setNotes('');
    setRows(1);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  useEffect(() => {
    setLastPrompt(Date.now());
  }, [setLastPrompt]);

  return (
      <div className="p-4 space-y-6 card">
      <h1 className="text-2xl font-bold mb-4">Mood Entry</h1>

      <div>
        <p className="mb-2 text-base leading-relaxed">How are you feeling today?</p>
        <div className="flex items-center gap-3">
          {moodEmojis.map((emoji, index) => (
            <motion.button
              key={emoji}
              onClick={() => setMood(index + 1)}
              aria-label={moodLabels[index]}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }}
              className={
                'w-12 h-12 flex items-center justify-center rounded-full border text-3xl transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-primary hover:scale-110 ' +
                (mood === index + 1 ? 'scale-110' : 'opacity-50')
              }
            >
              {emoji}
            </motion.button>
          ))}
        </div>
      </div>


      <div>
        <label htmlFor="notes" className="block mb-1 text-base leading-relaxed">
          Notes (optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onFocus={() => setRows(4)}
          onBlur={() => {
            if (notes === '') setRows(1);
          }}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 border rounded bg-creamWhite text-indigo dark:text-creamWhite transition-all"
          rows={rows}
        />
      </div>

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-primary-dark text-white rounded"
      >
        Save Entry
      </button>
      {saved && (
        <div className="mt-2 p-2 bg-paleSky text-indigo rounded shadow">
          Entry saved!
        </div>
      )}
    </div>
  );
}
