"use client"
import MainHeader from '@/components/main-header';
import './globals.css';
import './page.module.css'
import styles from './page.module.css'

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={styles.body}>

        <MainHeader />
        {children}
        </body>
        </html>
    );
}
