'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import style from './AdminNav.module.css';
import { RoutesAdmin } from './AdminNav.model';

const AdminNav = () => {
    const pathname = usePathname();

    return (
        <ul className={style.AdminNav}>
            <h4>Principales</h4>
            {Object.values(RoutesAdmin).map(({ path, name, icon: Icon }) => (
                <Link key={path} href={path}>
                    <li className={pathname === path || (pathname.includes('cursos') && path.includes('cursos')) ? style.Seleccionado : ''}>
                        <Icon />
                        {name}
                    </li>
                </Link>
            ))}
        </ul>
    );
};

export default AdminNav;
