import { useMoodStore } from '../contexts/useMoodStore';

export default function StreakCounter() {
  const getStreak = useMoodStore((state) => state.getStreak);
  const streak = getStreak();

  let reward = '';
  if (streak >= 30) reward = '🏆';
  else if (streak >= 7) reward = '🔥';

  return (
    <div className="mt-4 p-4 border rounded">
      <h2 className="text-lg font-bold">Current Streak</h2>
      <p className="text-2xl">
        {streak} day{streak === 1 ? '' : 's'} {reward}
      </p>
    </div>
  );
}
