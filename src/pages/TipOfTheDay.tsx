import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMoodStore } from '../contexts/useMoodStore';
import { selectTip } from '../utils/selectTip';

export default function TipOfTheDay() {
  const navigate = useNavigate();
  const entries = useMoodStore((state) => state.entries);
  const [tip, setTip] = React.useState('');
  const [time, setTime] = React.useState('');

  React.useEffect(() => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('dailyTip');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { date: string; tip: string };
        if (parsed.date === today) {
          setTip(parsed.tip);
          return;
        }
      } catch {
        // ignore parse errors
      }
    }
    const newTip = selectTip(entries);
    localStorage.setItem('dailyTip', JSON.stringify({ date: today, tip: newTip }));
    setTip(newTip);
  }, [entries]);

  const handleRemind = () => {
    if (!time) {
      navigate(-1);
      return;
    }
    if (typeof window === 'undefined' || !('Notification' in window)) {
      navigate(-1);
      return;
    }
    if (Notification.permission === 'default') {
      void Notification.requestPermission();
    }
    const [h, m] = time.split(':').map(Number);
    const now = new Date();
    const next = new Date();
    next.setHours(h, m, 0, 0);
    if (next.getTime() <= now.getTime()) {
      next.setDate(next.getDate() + 1);
    }
    const delay = next.getTime() - now.getTime();
    window.setTimeout(() => {
      if (Notification.permission === 'granted') {
        new Notification('Daily Tip Reminder', { body: tip });
      }
    }, delay);
    navigate(-1);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="p-4 border rounded bg-creamWhite dark:bg-indigo">
        {tip}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-primary-dark text-white rounded"
        >
          Got it
        </button>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 border rounded text-indigo dark:text-creamWhite"
        />
        <button
          onClick={handleRemind}
          className="px-4 py-2 bg-yellow text-indigo rounded"
        >
          Remind me at...
        </button>
      </div>
    </div>
  );
}
