"use client";
import Link from 'next/link';
import Image from 'next/image';
import styles from './main-header.module.css';
import { usePathname } from 'next/navigation';

import logoImg from '@/assets/icons/car.png';
import login from '@/assets/icons/login.png';
import loginActive from '@/assets/icons/login-active.png';

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

/* TODO: Trzeba zrobić aby logo podmieniało się na loginActive kiedy na nie najedziemy */
export default function MainHeader() {
    return (
        <header className={styles.header}>
            <Link className={styles.logo} href="/">
                <Image
                    src={logoImg}
                    alt="A plate with food on it"
                    priority
                    width={50}
                    height={50}
                />
                Car Salon
            </Link>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <NavLink href="/gallery">Browse Cars</NavLink>
                    </li>
                    <li>
                        <NavLink href="/contact">Contact Us</NavLink>
                    </li>

                    <div className={styles.login}>
                        <NavLink href="/login">
                            <Image
                                src={login}
                                alt="A plate with food on it"
                                priority
                                width={50}
                                height={50}
                            />
                        </NavLink>
                    </div>
                </ul>
            </nav>

        </header>
    );
}
