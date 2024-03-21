import styles from './styles.module.scss'
import Link from 'next/link'
import logoImg from '../../public/logo.png';
import { FiLogOut } from 'react-icons/fi';

import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';


export function Header(){

    //const { user } = useContext(AuthContext)  <h1>Olá {user.name} <h1> (Ex de uso caso eu precise do nome do usuário)
    const { signOut } = useContext(AuthContext)

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/dashboard'>
                    <img src='/logo.png' width={170} height={90} />
                </Link>

                <nav className={styles.menuNav}>
                    <Link href="/category">
                        <span>Categoria</span>
                    </Link>

                    <Link href="/product">
                        <span>Cardapio</span>
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color='#FFF' size={24} />
                    </button>
                </nav>
            </div>
        </header>
    )
}