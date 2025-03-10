import classes from './page.module.css';
import loadingClass from '@/app/loading.module.css';
import CarsGrid from "@/components/grid/car-grid";
import { getCars } from '@/app/lib/cars';
import {Suspense} from "react";
import AddButton from "./add-button"

async function Cars(){
    const cars = await getCars();
    return <CarsGrid cars={cars} />
}

export default async function CarsPage() {
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Choose from a wide range of cars and hit the road hassle-free.
                </h1>
                <p>
                    Affordable, convenient, and ready when you are!
                </p>
                <AddButton />
            </header>
            <main className={classes.main}>
                <Suspense fallback={<p className={loadingClass.loading}>Loading cars...</p>}>
                    <Cars />
                </Suspense>
            </main>
        </>
    );
}
