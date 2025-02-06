"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { getCars } from "@/app/lib/cars";
import loadingClass from '@/app/loading.module.css';
import classes from "@/app/rent-a-car/[slug]/page.module.css";

export default function Gallery() {
    const [cars, setCars] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        async function fetchCars() {
            const carsData = await getCars();
            setCars(carsData);
        }
        fetchCars();
    }, []);

    const openImage = (index) => {
        setCurrentIndex(index);
        setSelectedImage(cars[index].image);
    };

    const closeImage = () => {
        setSelectedImage(null);
    };

    const nextImage = () => {
        const newIndex = (currentIndex + 1) % cars.length;
        setCurrentIndex(newIndex);
        setSelectedImage(cars[newIndex].image);
    };

    const prevImage = () => {
        const newIndex = (currentIndex - 1 + cars.length) % cars.length;
        setCurrentIndex(newIndex);
        setSelectedImage(cars[newIndex].image);
    };

    return (
        <>
            <div className={classes.container}>
            <header className={styles.header}>
                <h1>Gallery</h1>
            </header>

            <main className={styles.grid}>
                {cars.length === 0 ? (
                    <p className={loadingClass.loading}>Loading images...</p>
                ) : (
                    cars.map((car, index) => (
                        <img
                            key={car.id}
                            src={car.image}
                            alt={car.name}
                            className={styles.gridImage}
                            onClick={() => openImage(index)}
                        />
                    ))
                )}
            </main>

            {selectedImage && (
                <div className={styles.lightbox}>
                    <button className={styles.close} onClick={closeImage}>×</button>
                    <button className={styles.prev} onClick={prevImage}>‹</button>
                    <img src={selectedImage} alt="Selected Car" className={styles.largeImage} />
                    <button className={styles.next} onClick={nextImage}>›</button>
                </div>
            )}
            </div>
        </>
    );
}
