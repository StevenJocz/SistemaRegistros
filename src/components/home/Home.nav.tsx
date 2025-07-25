"use client"
import { useState } from 'react';
import style from './Home.module.css'
import { IoCaretForwardCircleOutline, IoSchoolOutline } from "react-icons/io5";


const HomeNav = () => {
    const [menu, setMenu] = useState(1);

    return (
        <div className={style.Home_Nav}>
            <ul>
                <li
                    className={`${menu === 1 ? style.Activo : ''}`}
                    onClick={() => setMenu(1)}
                >
                    <IoCaretForwardCircleOutline className={style.Icono} />
                    Mis Cursos
                </li>
                <li
                    className={`${menu === 2 ? style.Activo : ''}`}
                    onClick={() => setMenu(2)}
                >
                    <IoSchoolOutline className={style.Icono} />
                    Mis Certificados
                </li>
            </ul>
            

        </div>
    )
}

export default HomeNav