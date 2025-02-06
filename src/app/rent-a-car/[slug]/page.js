"use server";
import RentalSlider from '@/components/rental-slider';
import classes from "./page.module.css";
import { getCar } from "@/app/lib/cars";
import { notFound } from "next/navigation";
import CarDetailsClient from './CarDetailsClient';

export default async function CarDetailsPage({ params }) {
    const { slug } = await params;
    const car = await getCar(slug);

    if (!car) {
        return notFound();
    }

    return (
        <div className={classes.container}>
            <CarDetailsClient car={car} slug={slug} />

            <div className={classes.rental}>
                <RentalSlider pricePerDay={car.price_per_day} />
            </div>
        </div>
    );
}
