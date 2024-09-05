import React from 'react';
import Logo from '@/components/logo';
import LocaleSwitcher2 from '@/components/ui/locale-switcher_v2';
import LoginButton from '@/components/ui/seConnecter';  
import PartenariatButton from '@/components/ui/partenariat';

const Header2: React.FC = () => {
    return (
        <header className="px-4 py-2 fixed top-0 inset-x-0 bg-background z-40 shadow-sm w-full">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto px-9">
            <Logo />
            <div className="flex items-center gap-4">
                <PartenariatButton />
                <LoginButton /> 
                <LocaleSwitcher2 /> 
            </div>
        </div>
    </header>
    );
};

export default Header2;