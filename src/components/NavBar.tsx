import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const [open, setOpen] = React.useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'block px-2 py-1 rounded hover:bg-mutedBlueGray dark:hover:bg-indigo',
      isActive
        ? 'bg-primary text-white dark:bg-primary-dark'
        : 'text-indigo dark:text-yellow',
    ].join(' ');

  const links = (
    <>
      <NavLink to="/home" className={linkClass} onClick={() => setOpen(false)}>
        Home
      </NavLink>
      <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>
        About
      </NavLink>
      <NavLink
        to="/customize"
        className={linkClass}
        onClick={() => setOpen(false)}
      >
        Customize
      </NavLink>
      <NavLink to="/mood" className={linkClass} onClick={() => setOpen(false)}>
        Mood
      </NavLink>
      <NavLink
        to="/calendar"
        className={linkClass}
        onClick={() => setOpen(false)}
      >
        Calendar
      </NavLink>
      <NavLink
        to="/scheduler"
        className={linkClass}
        onClick={() => setOpen(false)}
      >
        Scheduler
      </NavLink>
      <NavLink
        to="/analytics"
        className={linkClass}
        onClick={() => setOpen(false)}
      >
        Analytics
      </NavLink>
    </>
  );

  return (
    <nav className="bg-paleSky dark:bg-indigo p-4">
      <div className="flex items-center justify-between md:hidden">
        <button
          className="text-indigo dark:text-yellow"
          onClick={() => setOpen((o) => !o)}
        >
          &#9776;
        </button>
      </div>
      <div className="hidden md:flex gap-4">{links}</div>
      {open && <div className="flex flex-col gap-2 mt-2 md:hidden">{links}</div>}
    </nav>
  );
}
