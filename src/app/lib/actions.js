"use server";

import { deleteCar } from "@/app/lib/cars";
import { revalidatePath } from "next/cache";

export async function deleteCarAction(formData) {
    const slug = formData.get("slug");

    if (!slug) {
        return { success: false, error: "Slug is required" };
    }

    const result = await deleteCar(slug);

    if (result.success) {
        revalidatePath("/");
    }

    return result;
}
