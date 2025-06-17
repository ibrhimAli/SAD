import React from 'react';
import {
  addMonths,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
} from 'date-fns';
import { useMoodStore } from '../contexts/useMoodStore';
import type { MoodEntry } from '../contexts/useMoodStore';

interface DayDetailModalProps {
  date: Date;
  entry?: MoodEntry;
  onClose: () => void;
}

function DayDetailModal({ date, entry, onClose }: DayDetailModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow max-w-sm w-full">
        <h2 className="text-lg font-bold mb-2">{format(date, 'PPP')}</h2>
        {entry ? (
          <div className="space-y-1">
            <p>Mood: {entry.mood}</p>
            <p>Energy: {entry.energy}</p>
            <p>Sleep: {entry.sleep}</p>
            <p>Light: {entry.light}</p>
            {entry.notes && <p>Notes: {entry.notes}</p>}
          </div>
        ) : (
          <p>No entry for this day.</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-primary text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

const moodColors: Record<number, string> = {
  1: 'bg-red-500',
  2: 'bg-orange-500',
  3: 'bg-yellow-400',
  4: 'bg-green-500',
  5: 'bg-blue-500',
};

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(startOfMonth(new Date()));
  const entries = useMoodStore((state) => state.entries);
  const entryMap = React.useMemo(() => {
    const map: Record<string, MoodEntry> = {};
    for (const e of entries) {
      const key = format(e.timestamp, 'yyyy-MM-dd');
      map[key] = e;
    }
    return map;
  }, [entries]);

  const [selected, setSelected] = React.useState<Date | null>(null);

  const start = startOfWeek(startOfMonth(currentMonth));
  const end = endOfWeek(endOfMonth(currentMonth));
  const days: Date[] = [];
  for (let d = start; d <= end; d = addDays(d, 1)) {
    days.push(d);
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, -1))} className="px-2">Prev</button>
        <h2 className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="px-2">Next</button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="font-semibold">{d}</div>
        ))}
        {days.map((day) => {
          const key = format(day, 'yyyy-MM-dd');
          const entry = entryMap[key];
          const inMonth = isSameMonth(day, currentMonth);
          return (
            <button
              key={key}
              onClick={() => setSelected(day)}
              className={`h-16 border rounded flex flex-col items-center justify-center ${!inMonth ? 'text-gray-400' : ''}`}
            >
              <span>{format(day, 'd')}</span>
              {entry && (
                <span className={`mt-1 w-2 h-2 rounded-full ${moodColors[entry.mood]}`} />
              )}
            </button>
          );
        })}
      </div>
      {selected && (
        <DayDetailModal
          date={selected}
          entry={entryMap[format(selected, 'yyyy-MM-dd')]}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
