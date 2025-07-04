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
      <div className="bg-creamWhite dark:bg-indigo p-4 rounded shadow max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-2">{format(date, 'PPP')}</h2>
        {entry ? (
          <div className="space-y-1">
            <p className="text-base leading-relaxed">Mood: {entry.mood}</p>
            {entry.notes && (
              <p className="text-base leading-relaxed">Notes: {entry.notes}</p>
            )}
          </div>
        ) : (
          <p className="text-base leading-relaxed">No entry for this day.</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-primary-dark text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

const moodColors: Record<number, string> = {
  1: 'bg-indigo',
  2: 'bg-mutedBlueGray',
  3: 'bg-yellow',
  4: 'bg-paleSky',
  5: 'bg-creamWhite',
};

const moodLabels: Record<number, string> = {
  1: 'Very sad',
  2: 'Sad',
  3: 'Neutral',
  4: 'Happy',
  5: 'Very happy',
};

const moodEmojis: Record<number, string> = {
  1: '\uD83D\uDE22',
  2: '\uD83D\uDE41',
  3: '\uD83D\uDE10',
  4: '\uD83D\uDE42',
  5: '\uD83D\uDE04',
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
  const today = new Date();

  return (
    <div className="p-4 space-y-6">
      <div className="card mb-4 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, -1))} className="px-2">Prev</button>
          <h2 className="text-2xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="px-2">Next</button>
        </div>
        <div
          className="grid grid-cols-7 gap-2 text-center"
          role="grid"
          aria-label={`Mood entries for ${format(currentMonth, 'MMMM yyyy')}`}
        >
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="font-semibold">{d}</div>
          ))}
          {days.map((day, index) => {
          const key = format(day, 'yyyy-MM-dd');
          const entry = entryMap[key];
          const inMonth = isSameMonth(day, currentMonth);
          const isToday = day.toDateString() === today.toDateString();
          const week = Math.floor(index / 7);
          const bg =
            week % 2 === 0
              ? 'bg-creamWhite dark:bg-indigo'
              : 'bg-pastelYellow dark:bg-paleSky';
          return (
            <button
              key={key}
              onClick={() => setSelected(day)}
              className={`h-16 border rounded flex flex-col items-center justify-center ${bg} ${!inMonth ? 'text-primary-dark dark:text-mutedBlueGray' : ''} ${isToday ? 'ring-2 ring-primary-dark bg-paleSky dark:bg-mutedBlueGray' : ''}`}
            >
              <span>{format(day, 'd')}</span>
              {entry && (
                <span
                  aria-label={moodLabels[entry.mood]}
                  className={`mt-1 w-4 h-4 rounded-full flex items-center justify-center ${moodColors[entry.mood]}`}
                >
                  <span className="text-xs">{moodEmojis[entry.mood]}</span>
                </span>
              )}
            </button>
          );
          })}
        </div>
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
