
import Image from 'next/image';
import style from './Inicio.module.css'
import svg from '../../../../public/svg/stroke.svg'
import Link from 'next/link';
import Formulario from './Inicio.formulario';
import { blurImagen, Routes } from '@/models';


function Inicio() {
    return (
        <div className={style.Inicio}>
            <Link href="">
                <h1><span>SR</span></h1>
            </Link>
            <div className={style.Inicio_Content}>
                <div className={style.Inicio_Content_Body}>
                    <h2><span>Inicia sesión</span></h2>
                    <Formulario />
                    <div className={style.Inicio_Content_Olvide}>
                        <Link href={Routes.NEWPASSWORD.path}> Olvide mi contraseña</Link>
                    </div>
                </div>
            </div>
            <footer className={style.Footer}>
                <p>© 2025 desarrollado por Hamilton Espinal. Todos los derechos reservados.</p>
            </footer>
            <Image
                src={svg}
                className={style.svg}
                alt="Imagen de fondo svg"
                width={800}
                height={800}
                placeholder="blur"
                blurDataURL={blurImagen}
            />
        </div>
    )
}

export default Inicio