"use client"
import MainHeader from '@/components/main-header';
import './globals.css';
import './page.module.css'
import styles from './page.module.css'
import { SessionProvider } from "next-auth/react";
export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={styles.body}>
        <SessionProvider>
        <MainHeader />
        {children}</SessionProvider>
        </body>
        </html>
    );
}
