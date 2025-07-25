import { Nav } from '@/components/nav';
import React, { ReactNode } from 'react'
import style from './AdminLayout.module.css'
import { AdminNav } from '@/components/admin/nav';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Registro de Personas",
    description: "Registro de personas",
    icons: {
        icon: ['../../favicon.ico'],
        apple: ['../../favicon.ico'],
    },
};

interface AdminLayoutProps {
    children: ReactNode;
}

const layout: React.FC<AdminLayoutProps> = ({ children }) => {
    const theme: 'dark' | 'light' = 'dark';
    return (
        <>
            <Nav theme={theme} />
            <main className={style.AdminLayout}>
                <div className={style.AdminLayout_Nav}>
                    <AdminNav />
                </div>
                <div className={style.AdminLayout_Content}>
                    {children}
                </div>
            </main>
        </>
    )
}

export default layout