'use client';

import { IoBook, IoChevronDownOutline, IoExit, IoPerson } from 'react-icons/io5';
import style from './NavPerfil.module.css';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface NavProps {
    theme: 'dark' | 'light';
}

const NavPerfil: React.FC<NavProps> = ({ theme }) => {
    const [decodedToken, setDecodedToken] = useState<any>(null);
    const [verMenu, setVerMenu] = useState(false);

    // Obtener el token solo en el cliente
    useEffect(() => {
        const token = Cookies.get('gresptes');
        if (token) {
            try {
                setDecodedToken(jwtDecode(token));
            } catch (error) {
                console.error('Error al decodificar el token:', error);
            }
        }
    }, []); // Solo se ejecuta al montar el componente

    const handleVerMenu = () => {
        setVerMenu(!verMenu);
    };

    const handleLogout = () => {
        Cookies.remove('gresptes');
        window.location.reload();
    };

    return (
        <div className={`${style.NavPerfil} ${theme === 'dark' ? style.dark : ''}`}>
            <div className={style.NavPerfil_Texto} onClick={handleVerMenu}>
                <h2>¡Hola, {decodedToken?.nombre || 'Usuario'}!</h2>
                <IoChevronDownOutline className={style.NavPerfil_Texto_Icono} />
            </div>
            {verMenu && (
                <>
                    <div className={style.NavPerfil_Contect} onClick={handleVerMenu}></div>
                    <div className={style.NavPerfil_Contect_Menu}>
                        <ul>
                            <li>
                                <IoPerson /> Mi cuenta
                            </li>
                           
                            <li onClick={handleLogout}>
                                <IoExit /> Salir
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default NavPerfil;
