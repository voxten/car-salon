"use client";

import classes from "./add-form.module.css";

export default function AddCarForm({ onClose }) {
    async function handleSubmit(event) {
        event.preventDefault(); // Prevent full page reload

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries()); // Convert formData to JSON object

        try {
            const response = await fetch("/api/cars/add-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error || "Failed to insert car");
            }

            window.location.reload();
        } catch (error) {
            console.error("Error adding car:", error.message);
        }
    }



    return (
        <div className={classes.headerText}>
            <div className={classes.headerText}>
                <h2>Add a New Car</h2>
                <form onSubmit={handleSubmit}>
                    <input name="slug" placeholder="Unique Slug" required />
                    <p className={classes.carInfo}>
                        <input className={classes.carInfo} name="name" placeholder="Car Name" required />
                    </p>
                    <p className={classes.carInfo}>
                        <input className={classes.carInfo} name="brand" placeholder="Brand" required />
                    </p>
                    <p className={classes.carInfo}>
                        <input className={classes.carInfo} name="image" placeholder="image" required />
                    </p>
                    <input name="model" placeholder="Model" required />
                    <input name="version" placeholder="Version" required />
                    <input name="color" placeholder="Color" required />
                    <input name="price_per_day" type="number" placeholder="Price per Day" required />
                    <input name="fuel_type" placeholder="Fuel Type" required />
                    <input name="fuel_usage" type="number" placeholder="Fuel Usage" required />
                    <input name="engine_name" placeholder="Engine Name" required />
                    <input name="power" type="number" placeholder="Power (HP)" required />
                    <input name="acceleration" type="number" placeholder="Acceleration (sec)" required />
                    <input name="max_speed" type="number" placeholder="Max Speed (km/h)" required />
                    <input name="gearbox_type" placeholder="Gearbox Type" required />
                    <input name="body_type" placeholder="Body Type" required />

                    <input name="production_year" type="number" placeholder="Production Year" required />
                    <textarea name="information" placeholder="Car Description" required />

                    <button type="submit">Submit</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}
