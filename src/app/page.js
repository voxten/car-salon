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
              <h1>test</h1>
              <p>Taste</p>
            </div>
            <div className={styles.cta}>
              <Link href="/gallery">Gallery</Link>
            </div>
          </div>
        </header>
        <main>

        </main>
      </>
  );
}
