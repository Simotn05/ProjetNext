// components/Sidebar.tsx
import { FC } from 'react';
import Link from 'next/link';
import { FaHome, FaUser, FaChartBar, FaSchool } from 'react-icons/fa';

interface NavLink {
  href: string;
  label: string;
  icon: JSX.Element;
}

interface SidebarProps {
  navLinks: NavLink[];
}

const Sidebar: FC<SidebarProps> = ({ navLinks }) => {
  return (
    <aside className="fixed top-0 left-0 bg-gray-800 text-white w-64 min-h-screen p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Tableau de Bord</h2>
      </div>
      <nav>
        <ul>
          {navLinks.map((link) => (
            <li key={link.href} className="mb-6">
              <Link href={link.href} passHref>
                <p className="flex items-center text-lg font-semibold hover:text-gray-300 transition-colors duration-200">
                  <span className="mr-4 text-xl">{link.icon}</span>
                  {link.label}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
