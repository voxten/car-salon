"use client";
import styles from './page.module.css'
import Link from 'next/link';
import ImageSlideshow from "@/components/image-slideshow";

export default function Home() {
  return (
      <>
        <header className={styles.header}>
          <div className={styles.slideshow}>
            <ImageSlideshow/>
          </div>
          <div>
            <div className={styles.hero}>
              <h1>Cars</h1>
              <p>Check our cars!</p>
            </div>
            <div className={styles.cta}>
                <Link href="/">Gallery</Link>
                <Link href="/rent-a-car">Explore Cars</Link>
            </div>
          </div>
        </header>
        <main>

        </main>
      </>
  );
}
