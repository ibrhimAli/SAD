import React from 'react';
import { useSchedulerStore } from '../contexts/useSchedulerStore';

export default function TherapyScheduler() {
  const { times, addTime, removeTime } = useSchedulerStore();
  const [newTime, setNewTime] = React.useState('12:00');

  React.useEffect(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return;
    }
    if (Notification.permission === 'default') {
      void Notification.requestPermission();
    }

    const ids: number[] = [];

    const schedule = (time: string) => {
      const [h, m] = time.split(':').map(Number);
      const now = new Date();
      const next = new Date();
      next.setHours(h, m, 0, 0);
      if (next.getTime() <= now.getTime()) {
        next.setDate(next.getDate() + 1);
      }
      const delay = next.getTime() - now.getTime();

      const trigger = () => {
        if (Notification.permission === 'granted') {
          new Notification('Therapy Reminder', {
            body: 'It is time for your scheduled therapy activity.',
          });
        }
        const id2 = window.setTimeout(trigger, 24 * 60 * 60 * 1000);
        ids.push(id2);
      };

      const id = window.setTimeout(trigger, delay);
      ids.push(id);
    };

    times.forEach(schedule);

    return () => {
      ids.forEach((id) => clearTimeout(id));
    };
  }, [times]);

  const handleAdd = () => {
    if (newTime && !times.includes(newTime)) {
      addTime(newTime);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Therapy Scheduler</h1>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          className="border p-2 rounded text-indigo dark:text-creamWhite"
        />
        <button onClick={handleAdd} className="px-4 py-2 bg-primary-dark text-white rounded">
          Add
        </button>
      </div>
      <ul className="space-y-2 mt-4">
        {times.map((time) => (
          <li key={time} className="flex items-center gap-2">
            <span className="flex-1">{time}</span>
            <button
              onClick={() => removeTime(time)}
              className="px-2 py-1 bg-yellow text-indigo rounded"
            >
              Remove
            </button>
          </li>
        ))}
        {times.length === 0 && (
          <li className="text-base leading-relaxed">No times scheduled.</li>
        )}
      </ul>
    </div>
  );
}
