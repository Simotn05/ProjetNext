"use client"
import React, { useState } from 'react';
import Logo from '@/components/logo';
import LocaleSwitcher from '@/components/ui/locale-switcher';
import LoginButton from '@/components/ui/seConnecter';
import PartenariatButton from '@/components/ui/partenariat';
import { HiMenu } from 'react-icons/hi'; 

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="px-4 py-2 sticky top-0 inset-x-0 bg-background z-40 shadow-sm">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto px-9">
        <Logo />

        <div className="hidden md:flex items-center gap-4">
          <PartenariatButton />
          <LoginButton />
          <LocaleSwitcher />
        </div>

        <div className="flex md:hidden items-center">
          <button onClick={toggleMenu} aria-label="Open menu" className="text-gray-700">
            <HiMenu size={24} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-2 bg-white shadow-md rounded-lg py-2">
          <div className="flex flex-col items-center justify-center gap-2">
            <PartenariatButton />
            <LoginButton />
            <LocaleSwitcher />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
