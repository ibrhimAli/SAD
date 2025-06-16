import { useEffect, useState } from 'react';
import { useCheckInStore } from '../contexts/useCheckInStore';
import { useMoodStore } from '../contexts/useMoodStore';

const moodEmojis = ['\uD83D\uDE22', '\uD83D\uDE41', '\uD83D\uDE10', '\uD83D\uDE42', '\uD83D\uDE04'];

export default function MoodEntry() {
  const { setLastPrompt } = useCheckInStore();
  const { addEntry } = useMoodStore();
  const [mood, setMood] = useState(3);
  const [energy, setEnergy] = useState(5);
  const [sleep, setSleep] = useState(5);
  const [light, setLight] = useState(5);
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    addEntry({ mood, energy, sleep, light, notes });
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
              className={
                'text-3xl transition transform ' +
                (mood === index + 1 ? 'scale-125' : 'opacity-50')
              }
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="energy" className="block mb-1">
          Energy Level: {energy}
        </label>
        <input
          id="energy"
          type="range"
          min="1"
          max="10"
          value={energy}
          onChange={(e) => setEnergy(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="sleep" className="block mb-1">
          Sleep Quality: {sleep}
        </label>
        <input
          id="sleep"
          type="range"
          min="1"
          max="10"
          value={sleep}
          onChange={(e) => setSleep(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="light" className="block mb-1">
          Light Exposure: {light}
        </label>
        <input
          id="light"
          type="range"
          min="1"
          max="10"
          value={light}
          onChange={(e) => setLight(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block mb-1">
          Notes (optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 border rounded text-gray-900 dark:text-white"
          rows={4}
        />
      </div>

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        Save Entry
      </button>
    </div>
  );
}
