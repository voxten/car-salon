import RentalSlider from '@/components/rental-slider';
import classes from "./page.module.css";
import { getCar, updateCar } from "@/app/lib/cars";
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
                    <h1 className={classes.title}>{car.name}</h1>
                    <p className={classes.carInfo}><strong>Brand:</strong> {car.brand}</p>
                    <p className={classes.carInfo}><strong>Model:</strong> {car.model} ({car.version})</p>
                    <p className={classes.carInfo}><strong>Color:</strong> {car.color}</p>
                    <p className={classes.carInfo}><strong>Price per day:</strong> ${car.price_per_day}</p>
                    <p className={classes.carInfo}><strong>Fuel Type:</strong> {car.fuel_type} ({car.fuel_usage} L/100km)</p>
                    <p className={classes.carInfo}><strong>Engine:</strong> {car.engine_name}</p>
                    <p className={classes.carInfo}><strong>Power:</strong> {car.power} HP</p>
                    <p className={classes.carInfo}><strong>Acceleration:</strong> {car.acceleration} sec (0-100 km/h)</p>
                    <p className={classes.carInfo}><strong>Max Speed:</strong> {car.max_speed} km/h</p>
                    <p className={classes.carInfo}><strong>Gearbox:</strong> {car.gearbox_type}</p>
                    <p className={classes.carInfo}><strong>Body Type:</strong> {car.body_type}</p>
                    <p className={classes.carInfo}><strong>Production Year:</strong> {car.production_year}</p>
                </div>
            </header>
            <main className={classes.headerText}>
                <section className={classes.details}>
                    <h2>Car Description</h2>
                    <p className={classes.carInfo}>{car.information}</p>
                </section>
            </main>
            <CarDetailsClient car={car} slug={slug} />
            <div className={classes.rental}>
                <RentalSlider pricePerDay={car.price_per_day} />
            </div>
        </div>
    );
}
