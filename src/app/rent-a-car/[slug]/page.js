"use server";
import RentalSlider from '@/components/rental-slider';
import classes from "./page.module.css";
import { getCar } from "@/app/lib/cars";
import { notFound } from "next/navigation";
import CarDetailsClient from './CarDetailsClient'; // Create a separate client component

export default async function CarDetailsPage({ params }) {
    const { slug } = params;
    const car = await getCar(slug);

    if (!car) {
        return notFound();
    }

    return (
        <div className={classes.container}>
            <header className={classes.header}>
                <div className={classes.imageWrapper}>
                    <img src={car.image} alt={car.name} className={classes.image} />
                </div>
                <div className={classes.headerText}>
                    <CarDetailsClient car={car} slug={slug} />
                </div>
            </header>
            <main className={classes.headerText}>
                <section className={classes.details}>
                    <h2>Car Description</h2>
                    <p className={classes.carInfo}>{car.information}</p>
                </section>
            </main>

            <div className={classes.rental}>
                <RentalSlider pricePerDay={car.price_per_day} />
            </div>
        </div>
    );
}
