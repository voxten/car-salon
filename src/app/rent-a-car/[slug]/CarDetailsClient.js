"use client";

import { useState } from "react";
import classes from "./page.module.css";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/file-upload/file-upload";

export default function CarDetailsClient({ car, slug }) {
    const router = useRouter();
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState(car);

    const handleEditClick = () => setEditMode(true);

    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileUpload = (fileData) => {
        setUploadedFile(fileData);
        console.log("Uploaded file:", fileData);
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const updatedFormData = {
                ...formData,
                image: uploadedFile ? uploadedFile.url : formData.image
            };

            const response = await fetch(`/api/cars/${slug}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedFormData ),
            });

            if (!response.ok) {
                throw new Error("Failed to update car");
            }

            setEditMode(false);
            router.refresh();
        } catch (error) {
            console.error("Error updating car:", error);
        }
    };

    return (
        <div>
            <header className={classes.header}>
                {editMode ? (
                    <div className={classes.imageWrapper}>
                        <img
                            src={
                                uploadedFile
                                    ? uploadedFile.url
                                    : !car.image || car.image === "/"
                                        ? "/placeholder.jpeg"
                                        : car.image
                            }
                            onError={(e) => (e.target.src = "/placeholder.jpeg")}
                            alt={car.name}
                        />
                        <div className={classes.uploadOverlay}>
                            <FileUpload onUpload={handleFileUpload} />
                        </div>
                    </div>
                ) : (
                    <div className={classes.imageWrapper}>
                        <img src={car.image} alt={car.name} className={classes.image} />
                    </div>
                )}
                <div className={classes.headerText}>
                    {editMode ? (
                        <h1 className={classes.title}>
                            <input className={classes.title} name="name" value={formData.name} onChange={handleChange} />
                        </h1>
                    ) : (
                        <h1 className={classes.title}>{car.name}</h1>
                    )}
                    {editMode ? (
                        <p className={classes.carInfo}><strong>Brand: </strong>
                            <input className={classes.carInfo} name="brand" value={formData.brand} onChange={handleChange} />
                        </p>
                    ) : (
                        <p className={classes.carInfo}><strong>Brand:</strong> {car.brand}</p>
                    )}
                    {editMode ? (
                        <p className={classes.carInfo}><strong>Model:</strong>
                            <input className={classes.carInfo} name="model" value={formData.model} onChange={handleChange} />
                        </p>
                    ) : (
                        <p className={classes.carInfo}><strong>Model:</strong> {car.model} ({car.version})</p>
                    )}
                    {editMode ? (
                        <p className={classes.carInfo}><strong>Version:</strong>
                            <input className={classes.carInfo} name="version" value={formData.version} onChange={handleChange} />
                        </p>
                    ) : (
                        <p className={classes.carInfo}><strong>Version:</strong> {car.version}</p>
                    )}
                    {editMode ? (
                        <p className={classes.carInfo}><strong>Color:</strong>
                            <input className={classes.carInfo} name="color" value={formData.color} onChange={handleChange} />
                        </p>
                    ) : (
                        <p className={classes.carInfo}><strong>Color:</strong> {car.color}</p>
                    )}
                    {editMode ? (
                        <p className={classes.carInfo}><strong>Price per day:</strong> $
                            <input className={classes.carInfo} name="price_per_day" type="number" value={formData.price_per_day} onChange={handleChange} />
                        </p>
                    ) : (
                        <p className={classes.carInfo}><strong>Price per day:</strong> ${car.price_per_day}</p>
                    )}
                    {editMode ? (
                        <p className={classes.carInfo}><strong>Fuel Type:</strong>
                            <input className={classes.carInfo} name="fuel_type" value={formData.fuel_type} onChange={handleChange} />
                        </p>
                    ) : (
                        <p className={classes.carInfo}><strong>Fuel Type:</strong> {car.fuel_type} ({car.fuel_usage} L/100km)</p>
                    )}
                    {editMode ? (
                        <p className={classes.carInfo}><strong>Fuel Usage:</strong>
                            <input className={classes.carInfo} name="fuel_usage" type="number" value={formData.fuel_usage} onChange={handleChange} />L/100km
                        </p>
                    ) : (
                        <p className={classes.carInfo}><strong>Fuel Usage:</strong> {car.fuel_usage} L/100km</p>
                    )}
                    {editMode ? (
                        <p className={classes.carInfo}><strong>Engine:</strong>
                            <input className={classes.carInfo} name="engine_name" value={formData.engine_name} onChange={handleChange} />
                        </p>
                    ) : (
                        <p className={classes.carInfo}><strong>Engine:</strong> {car.engine_name}</p>
                    )}
                    {editMode ? (
                        <p className={classes.carInfo}><strong>Power:</strong>
                            <input className={classes.carInfo} name="power" type="number" value={formData.power} onChange={handleChange} />HP
                        </p>
                    ) : (
                        <p className={classes.carInfo}><strong>Power:</strong> {car.power} HP</p>
                    )}
                    {editMode ? (
                        <p className={classes.carInfo}><strong>Acceleration:</strong>
                            <input className={classes.carInfo} name="acceleration" type="number" value={formData.acceleration} onChange={handleChange} />sec (0-100 km/h)
                        </p>
                    ) : (
                        <p className={classes.carInfo}><strong>Acceleration:</strong> {car.acceleration} sec (0-100 km/h)</p>
                    )}
                    {editMode ? (
                        <p className={classes.carInfo}><strong>Max Speed:</strong>
                            <input className={classes.carInfo} name="max_speed" type="number" value={formData.max_speed} onChange={handleChange} />km/h
                        </p>
                    ) : (
                        <p className={classes.carInfo}><strong>Max Speed:</strong> {car.max_speed} km/h</p>
                    )}
                    {editMode ? (
                        <p className={classes.carInfo}><strong>Gearbox:</strong>
                            <input className={classes.carInfo} name="gearbox_type" value={formData.gearbox_type} onChange={handleChange} />
                        </p>
                    ) : (
                        <p className={classes.carInfo}><strong>Gearbox:</strong> {car.gearbox_type}</p>
                    )}
                    {editMode ? (
                        <p className={classes.carInfo}><strong>Body Type:</strong>
                            <input className={classes.carInfo} name="body_type" value={formData.body_type} onChange={handleChange} />
                        </p>
                    ) : (
                        <p className={classes.carInfo}><strong>Body Type:</strong> {car.body_type}</p>
                    )}
                    {editMode ? (
                        <p className={classes.carInfo}><strong>Production Year:</strong>
                            <input className={classes.carInfo} name="production_year" type="number" value={formData.production_year} onChange={handleChange} />
                        </p>
                    ) : (
                        <p className={classes.carInfo}><strong>Production Year:</strong> {car.production_year}</p>
                    )}
                </div>
            </header>
            <main className={classes.headerText}>
                <section className={classes.details}>
                    <h2>Car Description</h2>
                    {editMode ? (
                        <p className={classes.carInfo}>
                            <input className={classes.carInfo} name="information" type="info" value={formData.information} onChange={handleChange} />
                        </p>
                    ) : (
                        <p className={classes.carInfo}>{car.information}</p>
                    )}
                    <input type="hidden" name="image" value={uploadedFile ? uploadedFile.url : car.image} />
                </section>
            </main>
            {editMode ? (
                <div className={classes.actions}>
                    <button onClick={handleSubmit}><a>Submit</a></button>
                </div>
            ) : (
                <div className={classes.actions}>
                    <button onClick={handleEditClick}><a>Edit</a></button>
                </div>
            )}

        </div>
    );
}
