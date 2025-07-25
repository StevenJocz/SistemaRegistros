import Link from 'next/link'
import style from './Nav.module.css'
import Navigator from '../routes/Navigator'
import { Routes } from '@/models'
import NavPerfil from './navPerfil/NavPerfil';

interface NavProps {
  theme: 'dark' | 'light';  // Prop para definir el tema
}

const Nav: React.FC<NavProps> = ({ theme }) => {
  return (
    <nav className={`${style.Nav} ${theme === 'dark' ? style.dark : ''}`}>
      <Link href={Routes.HOME.path}>
        <h3>Sistema de Registro</h3>
      </Link>
      <ul className={style.Nav_Link}>
        

      </ul>
      <div className={style.Nav_Perfil}>
        <NavPerfil theme={theme} />

      </div>
    </nav>
  )
}

export default Nav;
