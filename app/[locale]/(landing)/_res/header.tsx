// components/Header.tsx
import React from 'react';
import Logo from '@/components/logo';
import LocaleSwitcher from '@/components/ui/locale-switcher';
import LoginButton from '@/components/ui/seConnecter';  
import PartenariatButton from '@/components/ui/partenariat';

const Header: React.FC = () => {
    return (
        <header className="px-4 py-2 sticky top-0 inset-x-0 bg-background z-40 shadow-sm">
            <div className="container">
                <div className="flex items-center gap-4 justify-between">
                    <Logo />
                    <div className="flex items-center gap-4">
                        <PartenariatButton/>
                        
                        <LoginButton /> 
                        <LocaleSwitcher /> 

                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
