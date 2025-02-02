"use client";

import { useState } from "react";
import { updateCar } from "@/app/lib/cars";

export default function CarDetailsClient({ car, slug }) {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState(car);

    const handleEditClick = () => setEditMode(true);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        await updateCar(slug, formData);
        setEditMode(false);
    };

    return (
        <div>
            {editMode ? (
                <input name="name" value={formData.name} onChange={handleChange} />
            ) : (
                <h1>{car.name}</h1>
            )}
            {editMode ? (
                <button onClick={handleSubmit}>Submit</button>
            ) : (
                <button onClick={handleEditClick}>Edit</button>
            )}
        </div>
    );
}
