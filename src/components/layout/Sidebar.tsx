import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, Settings, Music2 } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils'; // For conditional class names

// Doraemon theme: Use a consistent blue, e.g., 'bg-blue-600' or a custom theme color
const DORAEMON_BLUE_BG = 'bg-blue-600'; // Placeholder for theme color
const DORAEMON_BLUE_TEXT_HOVER = 'hover:text-blue-300';
const DORAEMON_BLUE_ACCENT = 'bg-blue-500'; // For active item

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));
  console.log(`NavItem '${label}' to '${to}', current path: '${location.pathname}', isActive: ${isActive}`);

  return (
    <Link
      to={to}
      className={cn(
        'flex items-center p-3 space-x-3 rounded-md text-gray-200',
        DORAEMON_BLUE_TEXT_HOVER,
        isActive ? `${DORAEMON_BLUE_ACCENT} text-white font-semibold` : 'hover:bg-blue-700'
      )}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  console.log("Rendering Sidebar");

  return (
    <aside className={cn('w-64 h-screen text-white p-4 space-y-6 fixed top-0 left-0 overflow-y-auto', DORAEMON_BLUE_BG)}>
      <div className="flex items-center space-x-2 p-2 mb-4">
        <Music2 className="w-8 h-8 text-yellow-400" /> {/* Doraemon bell color? */}
        <h1 className="text-2xl font-bold">DoraPlay</h1>
      </div>

      <nav className="space-y-2">
        <NavItem to="/" icon={Home} label="Home" />
        <NavItem to="/search" icon={Search} label="Search" />
        <NavItem to="/library" icon={Library} label="Your Library" />
      </nav>

      {/* Example: Playlists section */}
      <div className="pt-4">
        <h2 className="px-3 mb-2 text-xs font-semibold tracking-wider text-blue-200 uppercase">Playlists</h2>
        {/* Placeholder for playlist links - map over actual playlists */}
        <Link to="/playlist/favorites" className={cn('block p-3 rounded-md text-sm text-gray-300', DORAEMON_BLUE_TEXT_HOVER, 'hover:bg-blue-700')}>
          Doraemon's Gadget Grooves
        </Link>
        <Link to="/playlist/new" className={cn('block p-3 rounded-md text-sm text-gray-300', DORAEMON_BLUE_TEXT_HOVER, 'hover:bg-blue-700')}>
          My Favorites
        </Link>
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <NavItem to="/settings" icon={Settings} label="Settings" />
      </div>
    </aside>
  );
};

export default Sidebar;