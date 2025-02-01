import classes from './page.module.css';
import loadingClass from './loading-out';
import CarsGrid from "@/components/grid/car-grid";
import { getCars } from '@/app/lib/cars';
import {Suspense} from "react";


async function Cars(){
    const cars = await getCars();
    return <CarsGrid cars={cars} />
}

export default async function CarsPage() {
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious meals, created{' '}
                    <span className={classes.highlight}>by you</span>
                </h1>
                <p>
                    Choose your favorite recipe and cook it yourself. It is easy and fun!
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<p className={loadingClass.loading}>Fetching cars...</p>}>
                    <Cars />
                </Suspense>
            </main>
        </>
    );
}
