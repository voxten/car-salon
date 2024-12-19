"use client";
import Link from 'next/link';
import Image from 'next/image';
import styles from './main-header.module.css';
import { usePathname } from 'next/navigation';


import logoImg from '../../../../assets/logo.png';

function NavLink({href, children}) {
    const path = usePathname();
    return (
        <Link href={href} className={
            path.startsWith(href) ? `${styles.link} ${styles.active}` : styles.link
        }>
            {children}
        </Link>
    );
}

export default function MainHeader() {
    return (
        <header className={styles.header}>
            <Link className={styles.logo} href="/lab11">
                <Image
                    src={logoImg}
                    alt="A plate with food on it"
                    priority
                    width={50}
                    height={50}
                />
                NextlevelFood
            </Link>
            <nav className={styles.nav}>
                <ul>
                    <li><NavLink href="/lab11/meals">Browse Meals</NavLink></li>
                    <li><NavLink href="/lab11/community">Foodies Community</NavLink></li>
                </ul>
            </nav>
        </header>
    );
}
