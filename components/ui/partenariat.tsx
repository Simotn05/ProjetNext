'use client';
import Link from 'next/link';
import React from 'react';
import { useTranslations } from "next-intl";
import { Partenariat_Route } from '../../routes';

const PartenariatButton: React.FC = () => {
    const  t  = useTranslations('Layout.PartenariatButton');

    const handleLogin = () => {
        console.log('Login clicked');
    };

    return (
        <Link href={Partenariat_Route} passHref>
        <button 
          onClick={handleLogin} 
          className="px-4 py-2 text-primary font-medium border-b-2 border-transparent hover:border-primary transition-colors duration-300">
          {t("Partenariat") + " "}
        </button>
      </Link>


    );
};

export default PartenariatButton;