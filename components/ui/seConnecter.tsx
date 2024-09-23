'use client';
import Link from 'next/link';
import React from 'react';
import { useTranslations } from "next-intl";
import { Connexion_Route } from '../../routes';

const LoginButton: React.FC = () => {
    const  t  = useTranslations('Layout.LoginButton');

    const handleLogin = () => {
        console.log('Login clicked');
    };

    return (
        <Link href={Connexion_Route} passHref>
            <button 
                onClick={handleLogin} 
                className="px-4 py-2 bg-primary text-primary-foreground border border-primary rounded-lg hover:bg-primary-dark transition">
                 {t("Login") + " "}
            </button>
        </Link>
    );
};

export default LoginButton;
