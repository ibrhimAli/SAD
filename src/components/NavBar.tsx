import React from 'react';
import { NavLink } from 'react-router-dom';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function NavBar() {
  const [open, setOpen] = React.useState(false);
  const [promptEvent, setPromptEvent] = React.useState<
    BeforeInstallPromptEvent | null
  >(null);

  React.useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setPromptEvent(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'block px-2 py-1 rounded hover:bg-mutedBlueGray dark:hover:bg-indigo',
      isActive
        ? 'bg-primary-dark text-white dark:bg-primary-dark'
        : 'text-indigo dark:text-yellow',
    ].join(' ');

  const links = (
    <>
      <NavLink
        to="/home"
        aria-label="Home"
        className={linkClass}
        onClick={() => setOpen(false)}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        aria-label="About"
        className={linkClass}
        onClick={() => setOpen(false)}
      >
        About
      </NavLink>
      <NavLink
        to="/customize"
        aria-label="Customize"
        className={linkClass}
        onClick={() => setOpen(false)}
      >
        Customize
      </NavLink>
      <NavLink
        to="/mood"
        aria-label="Mood"
        className={linkClass}
        onClick={() => setOpen(false)}
      >
        Mood
      </NavLink>
      <NavLink
        to="/calendar"
        aria-label="Calendar"
        className={linkClass}
        onClick={() => setOpen(false)}
      >
        Calendar
      </NavLink>
      <NavLink
        to="/scheduler"
        aria-label="Scheduler"
        className={linkClass}
        onClick={() => setOpen(false)}
      >
        Scheduler
      </NavLink>
      <NavLink
        to="/challenge"
        aria-label="Challenge"
        className={linkClass}
        onClick={() => setOpen(false)}
      >
        Challenge
      </NavLink>
      <NavLink
        to="/analytics"
        aria-label="Analytics"
        className={linkClass}
        onClick={() => setOpen(false)}
      >
        Analytics
      </NavLink>
      {promptEvent && (
        <button
          onClick={() => {
            promptEvent.prompt();
            setPromptEvent(null);
          }}
          className="block px-2 py-1 rounded text-indigo dark:text-yellow hover:bg-mutedBlueGray dark:hover:bg-indigo"
        >
          Install
        </button>
      )}
    </>
  );

  return (
    <nav className="bg-paleSky dark:bg-indigo p-4">
      <div className="flex items-center justify-between md:hidden">
        <button
          className="text-indigo dark:text-yellow"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation"
        >
          &#9776;
        </button>
      </div>
      <div className="hidden md:flex gap-4">{links}</div>
      {open && (
        <div className="flex flex-col gap-2 mt-2 md:hidden">{links}</div>
      )}
    </nav>
  );
}
