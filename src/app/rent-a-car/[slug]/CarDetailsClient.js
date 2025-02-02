"use client";

import { useState } from "react";

export default function CarDetailsClient({ car, slug }) {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState(car);

    const handleEditClick = () => setEditMode(true);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`/api/cars/${slug}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to update car");
            }

            setEditMode(false);
        } catch (error) {
            console.error("Error updating car:", error);
        }
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
