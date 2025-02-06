"use client";

import { useRef, useState } from "react";
import classes from "./file-upload.module.css";

export default function FileUpload({ onUpload }) {
    const inputFileRef = useRef(null);
    const [uploadStatus, setUploadStatus] = useState("");

    async function handleImageUpload() {
        const file = inputFileRef.current.files[0];
        if (!file) {
            setUploadStatus("❌ Please select a file.");
            return;
        }

        try {
            setUploadStatus("⏳ Uploading...");

            const response = await fetch(`/api/upload?filename=${file.name}`, {
                method: "POST",
                body: file,
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            const newBlob = await response.json();
            onUpload(newBlob);
            setUploadStatus("✅ Image uploaded successfully!");
        } catch (error) {
            console.error("Error uploading image:", error);
            setUploadStatus("❌ Upload failed. Please try again.");
        }
    }

    return (
        <div className={classes.fileUploadClass}>
            <input name="file" ref={inputFileRef} type="file" required />
            <button type="button" onClick={handleImageUpload}><a>Upload Image</a></button>
            {uploadStatus && <p className={classes.statusMessage}>{uploadStatus}</p>}
        </div>
    );
}
