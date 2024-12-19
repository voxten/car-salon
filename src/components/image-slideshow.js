'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import classes from './image-slideshow.module.css';

import porschegt3 from "@/assets/porsche-911-gt3.png";
import porschecarrera from "@/assets/porsche-911-carrera.png";
import ferrarif121 from "@/assets/ferrari-f121.png"

const images = [
    { image: porschegt3, alt: 'Porsche 911 GT3' },
    { image: porschecarrera, alt: 'Porsche 911 Carrera' },
    { image: ferrarif121, alt: 'Ferrari F121' }
];

export default function ImageSlideshow() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex < images.length - 1 ? prevIndex + 1 : 0
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={classes.slideshow}>
            {images.map((image, index) => (
                <Image
                    key={index}
                    src={image.image}
                    className={index === currentImageIndex ? classes.active : ''}
                    alt={image.alt}
                />
            ))}
        </div>
    );
}
