"use client";

import { useState } from 'react';
import classes from "./add-form.module.css";
import FileUpload from "@/components/file-upload/file-upload";

export default function AddCarForm({ onClose }) {
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileUpload = (fileData) => {
        setUploadedFile(fileData);
        console.log("Uploaded file:", fileData);
    };

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

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
        <div className={classes.container}>
            <form onSubmit={handleSubmit}>
                <header className={classes.header}>
                    <div className={classes.imageWrapper}>
                        <img
                            src={uploadedFile ? uploadedFile.url : "/placeholder.jpeg"}
                            alt="car-image"
                            className={classes.image}
                        />
                        <div className={classes.uploadOverlay}>
                            <FileUpload onUpload={handleFileUpload} />
                        </div>
                    </div>
                    <div className={classes.headerText}>
                        <div className={classes.headerText}>
                            <h1 className={classes.title}>Add a New Car</h1>
                                <p className={classes.carInfo}>
                                    <strong>Slug: </strong>
                                    <input className={classes.carInfo} name="slug" placeholder="Unique Slug" required />
                                </p>
                                <p className={classes.carInfo}>
                                    <strong>Name: </strong>
                                    <input className={classes.carInfo} name="name" placeholder="Car Name" required />
                                </p>
                                <p className={classes.carInfo}>
                                    <strong>Brand: </strong>
                                    <input className={classes.carInfo} name="brand" placeholder="Brand" required />
                                </p>
                                <input type="hidden" name="image" value={uploadedFile ? uploadedFile.url : ""} />
                                <p className={classes.carInfo}>
                                    <strong>Model: </strong>
                                    <input className={classes.carInfo} name="model" placeholder="Model" required />
                                </p>
                                <p className={classes.carInfo}>
                                    <strong>Version: </strong>
                                    <input className={classes.carInfo} name="version" placeholder="Version" required />
                                </p>
                                <p className={classes.carInfo}>
                                    <strong>Color: </strong>
                                    <input className={classes.carInfo} name="color" placeholder="Color" required />
                                </p>
                                <p className={classes.carInfo}>
                                    <strong>Price per Day: </strong>
                                    <input className={classes.carInfo} name="price_per_day" type="number" placeholder="Price per Day" required />
                                </p>
                                <p className={classes.carInfo}>
                                    <strong>Fuel Type: </strong>
                                    <input className={classes.carInfo} name="fuel_type" placeholder="Fuel Type" required />
                                </p>
                                <p className={classes.carInfo}>
                                    <strong>Fuel Usage: </strong>
                                    <input className={classes.carInfo} name="fuel_usage" type="number" placeholder="Fuel Usage" required />
                                </p>
                                <p className={classes.carInfo}>
                                    <strong>Engine: </strong>
                                    <input className={classes.carInfo} name="engine_name" placeholder="Engine Name" required />
                                </p>
                                <p className={classes.carInfo}>
                                    <strong>Power: </strong>
                                    <input className={classes.carInfo} name="power" type="number" placeholder="Power (HP)" required />
                                </p>
                                <p className={classes.carInfo}>
                                    <strong>Acceleration: </strong>
                                    <input className={classes.carInfo} name="acceleration" type="number" placeholder="Acceleration (sec)" required />
                                </p>
                                <p className={classes.carInfo}>
                                    <strong>Max Speed: </strong>
                                    <input className={classes.carInfo} name="max_speed" type="number" placeholder="Max Speed (km/h)" required />
                                </p>
                                <p className={classes.carInfo}>
                                    <strong>Acceleration: </strong>
                                    <input className={classes.carInfo} name="gearbox_type" placeholder="Gearbox Type" required />
                                </p>
                                <p className={classes.carInfo}>
                                    <strong>Body Type: </strong>
                                    <input className={classes.carInfo} name="body_type" placeholder="Body Type" required />
                                </p>
                                <p className={classes.carInfo}>
                                    <strong>Production Year: </strong>
                                    <input className={classes.carInfo} name="production_year" type="number" placeholder="Production Year" required />
                                </p>
                        </div>
                    </div>
                </header>
                <main className={classes.headerText}>
                    <section className={classes.details}>
                        <h2>Car Description</h2>
                        <input className={classes.carInfo} name="information" placeholder="Car Description" required />
                    </section>
                </main>
                <div className={classes.actions}>
                    <button type="submit"><a>Submit</a></button>
                </div>
            </form>
        </div>
    );
}
