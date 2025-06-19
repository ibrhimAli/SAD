import React from 'react';
import { useSchedulerStore } from '../contexts/useSchedulerStore';
import type { ScheduledMoment } from '../contexts/useSchedulerStore';

export default function TherapyScheduler() {
  const { times, addTime, removeTime } = useSchedulerStore();
  const [newTime, setNewTime] = React.useState('12:00');
  const [newLabel, setNewLabel] = React.useState('walk reminder');

  React.useEffect(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return;
    }
    if (Notification.permission === 'default') {
      void Notification.requestPermission();
    }

    const ids: number[] = [];

    const schedule = (entry: ScheduledMoment) => {
      const [h, m] = entry.time.split(':').map(Number);
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
    if (newTime && !times.some((t) => t.time === newTime)) {
      addTime(newTime, newLabel);
      setNewLabel('walk reminder');
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-2">Light Therapy Scheduler</h1>
      <p className="text-base leading-relaxed mb-2">
        Set times to step outside for sunlight and feel your best.
      </p>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          className="border p-2 rounded text-indigo dark:text-creamWhite"
        />
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          className="border p-2 rounded text-indigo dark:text-creamWhite"
          placeholder="label"
        />
        <button onClick={handleAdd} className="px-4 py-2 bg-primary-dark text-white rounded">
          Add
        </button>
      </div>
      <ul className="space-y-2 mt-4">
        {times.map(({ time, label }) => (
          <li key={time} className="flex items-center gap-2">
            <span className="flex-1">
              {time}
              {label && (
                <span className="ml-2 text-sm text-indigo dark:text-yellow">{label}</span>
              )}
            </span>
            <button
              onClick={() => removeTime(time)}
              className="px-2 py-1 bg-yellow text-indigo rounded"
            >
              Remove
            </button>
          </li>
        ))}
        {times.length === 0 && (
          <li className="text-base leading-relaxed">
            You haven’t set any sunlight moments yet ☁️
          </li>
        )}
      </ul>
    </div>
  );
}
