import { useThemeStore } from '../contexts/useThemeStore';
import { useCheckInStore } from '../contexts/useCheckInStore';

export default function Customize() {
  const {
    dark,
    toggle,
    season,
    setSeason,
    notificationFrequency,
    setNotificationFrequency,
  } = useThemeStore();
  const { reminderTime, setReminderTime } = useCheckInStore();

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Customize Settings</h1>

      <div className="flex items-center gap-2">
        <label htmlFor="dark-toggle" className="text-base leading-relaxed">Dark Mode</label>
        <input
          id="dark-toggle"
          type="checkbox"
          checked={dark}
          onChange={toggle}
        />
      </div>

      <div>
        <label htmlFor="season-select" className="block mb-1 text-base leading-relaxed">
          Your season right now?
        </label>
        <select
          id="season-select"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="p-2 border rounded text-indigo dark:text-creamWhite"
        >
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
          <option value="Autumn">Autumn</option>
          <option value="Winter">Winter</option>
        </select>
      </div>

      <div>
        <label htmlFor="notification-range" className="block mb-1 text-base leading-relaxed">
          Notification Frequency
        </label>
        <input
          id="notification-range"
          type="range"
          min="0"
          max="10"
          value={notificationFrequency}
          onChange={(e) => setNotificationFrequency(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-mutedBlueGray mt-1">
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
        </div>
      </div>

      <div>
        <label htmlFor="reminder-time" className="block mb-1 text-base leading-relaxed">
          Daily Check-In Time
        </label>
        <input
          id="reminder-time"
          type="time"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          className="p-2 border rounded text-indigo dark:text-creamWhite"
        />
        <p className="mt-1 text-base leading-relaxed text-mutedBlueGray">
          You’ll be reminded daily at {reminderTime}
        </p>
      </div>
    </div>
  );
}
