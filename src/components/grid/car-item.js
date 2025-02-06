"use client";
import Link from "next/link";
import { deleteCarAction } from "@/app/lib/actions";
import classes from "./car-item.module.css";
import { useSession } from 'next-auth/react';

export default function CarItem({ name, slug, image, model, brand, price_per_day, power, acceleration, max_speed }) {
    const { data: session, status } = useSession();
    const isLoggedIn = status === "authenticated";
    const isAdmin = isLoggedIn && session?.user?.role === "admin";
    return (
        <article className={classes.car}>
            <header>
                <div className={classes.image}>
                    <img src={image} alt={name} />
                </div>
                <div className={classes.headerText}>
                    <h2>{name}</h2>
                    <p>{brand} {model}</p>
                </div>
            </header>
            <div className={classes.content}>
                <p className={classes.summary}><strong>Price per day:</strong> ${price_per_day}</p>
                <p className={classes.summary}><strong>Power:</strong> {power} HP</p>
                <p className={classes.summary}><strong>Acceleration:</strong> {acceleration} sec (0-100 km/h)</p>
                <p className={classes.summary}><strong>Max Speed:</strong> {max_speed} km/h</p>
                <div className={classes.actions}>
                    {isLoggedIn && isAdmin && (
                        <div className={classes.delete}>
                            <form action={deleteCarAction}>
                                <input type="hidden" name="slug" value={slug} />
                                <button type="submit" className={classes.delete}><a>Delete</a></button>
                            </form>
                        </div>
                    )}
                    <Link href={`/rent-a-car/${slug}`}>View Details</Link>
                </div>
            </div>
        </article>
    );
}
