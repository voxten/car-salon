"use client";
import { useState, useEffect } from "react";
import classes from "./rental-slider.module.css";

export default function RentalSlider({ pricePerDay }) {
    const [rentalDays, setRentalDays] = useState(1);
    const [totalCost, setTotalCost] = useState(pricePerDay);

    useEffect(() => {
        setTotalCost(rentalDays * pricePerDay);
    }, [rentalDays, pricePerDay]);

    const handleSliderChange = (event) => {
        setRentalDays(Number(event.target.value));
    };

    return (
        <div className={classes.sliderContainer}>
            <label className={classes.label} htmlFor="rentalDays">
                Number of days: {rentalDays}
            </label>
            <input
                id="rentalDays"
                type="range"
                min="1"
                max="30"
                value={rentalDays}
                onChange={handleSliderChange}
                className={classes.slider}
            />
            <p className={classes.totalCost}>
                Total cost: <strong>${totalCost}</strong>
            </p>
        </div>
    );
}
