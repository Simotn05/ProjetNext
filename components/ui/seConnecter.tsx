// components/LoginButton.tsx
'use client'; // Directive for indicating client-side component
import Link from 'next/link';
import React from 'react';
import { Connexion_Route } from '../../routes'; // Update this path to the actual location of your route file

const LoginButton: React.FC = () => {
    const handleLogin = () => {
        // Logique pour le login
        console.log('Login clicked');
    };

    return (
        <Link href={Connexion_Route} passHref>
            <button 
                onClick={handleLogin} 
                className="px-4 py-2 bg-primary text-primary-foreground border border-primary rounded-lg hover:bg-primary-dark transition">
                Login
            </button>
        </Link>
    );
};

export default LoginButton;
