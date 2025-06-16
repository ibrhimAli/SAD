import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
      <nav className="flex gap-4 p-4 bg-gray-200 dark:bg-gray-800">
        <Link to="/home" className="text-blue-600 dark:text-blue-400">Home</Link>
        <Link to="/about" className="text-blue-600 dark:text-blue-400">About</Link>
      </nav>
  );
}
