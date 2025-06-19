import { useMoodStore } from '../contexts/useMoodStore';

export default function StreakCounter() {
  const getStreak = useMoodStore((state) => state.getStreak);
  const streak = getStreak();

  let reward = '';
  if (streak >= 30) reward = '🏆';
  else if (streak >= 7) reward = '🔥';

  return (
    <div className="mt-4 p-4 border rounded bg-creamWhite dark:bg-indigo">
      <h2 className="text-lg font-bold">Current Streak</h2>
      <p className="text-2xl flex items-center gap-1">
        {streak} day{streak === 1 ? '' : 's'}
        <span role="img" aria-label="streak badge">
          🔥
        </span>
        {reward && <span>{reward}</span>}
      </p>
    </div>
  );
}
