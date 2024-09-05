import { FC, useState } from 'react';
import Link from 'next/link';
import { FaHome, FaUser, FaChartBar, FaSchool, FaBars, FaTimes } from 'react-icons/fa';

interface NavLink {
  href: string;
  label: string;
  icon: JSX.Element;
}

interface SidebarProps {
  navLinks: NavLink[];
}

const Sidebar: FC<SidebarProps> = ({ navLinks }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Button to toggle sidebar on small screens */}
      <button
        className="fixed top-4 left-4 z-50 p-2 text-white lg:hidden bg-gray-800 rounded"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
      </button>

      {/* Sidebar for small screens */}
      <aside
        className={`fixed top-0 left-0 bg-gray-800 text-white w-64 min-h-screen p-6 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:w-64`}
      >
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

      {/* Sidebar overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
