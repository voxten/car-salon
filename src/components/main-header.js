"use client";
import Link from 'next/link';
import Image from 'next/image';
import styles from './main-header.module.css';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

import logoImg from '@/assets/icons/car.png';
import login from '@/assets/icons/login.png';
import loginActive from '@/assets/icons/login-active.png';

function NavLink({ href, children }) {
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
    const { data: session, status } = useSession();
    const path = usePathname();

    const isLoggedIn = status === "authenticated";

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
                        <NavLink href="/rent-a-car">Browse Cars</NavLink>
                    </li>
                    <li>
                        <NavLink href="/contact">Contact Us</NavLink>
                    </li>

                    <div className={styles.login}>
                        {isLoggedIn ? (
                            <div className={styles.userInfo}>
                                <span className={styles.username}>{session.user.name}</span>
                                <button
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                    className={styles.logoutButton}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <NavLink href="/login-form">
                                <Image
                                    src={path === "/login-form" ? loginActive : login}
                                    alt="Login icon"
                                    priority
                                    width={50}
                                    height={50}
                                />
                            </NavLink>
                        )}
                    </div>
                </ul>
            </nav>
        </header>
    );
}