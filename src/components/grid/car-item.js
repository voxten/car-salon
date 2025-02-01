import Link from 'next/link';
import Image from 'next/image';

import classes from './car-item.module.css';

export default function CarItem({ name, slug, image, model, brand, price_per_day, power, acceleration, max_speed }) {
    return (
        <article className={classes.meal}>
            <header>
                <div className={classes.image}>
                    <Image src={image} alt={name} fill />
                </div>
                <div className={classes.headerText}>
                    <h2>{name}</h2>
                    <p>{brand} {model}</p>
                </div>
            </header>
            <div className={classes.content}>
                <p className={classes.summary}>Price per day: ${price_per_day}</p>
                <p className={classes.summary}>Power: {power} HP</p>
                <p className={classes.summary}>Acceleration: {acceleration} sec (0-100 km/h)</p>
                <p className={classes.summary}>Max Speed: {max_speed} km/h</p>
                <div className={classes.actions}>
                    <Link href={`/rent-a-car/${slug}`}>View Details</Link>
                </div>
            </div>
        </article>
    );
}
