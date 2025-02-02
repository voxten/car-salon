import { updateCar } from "@/app/lib/cars"; // This is fine on the server side

export async function PUT(req, { params }) {
    try {
        const body = await req.json();
        await updateCar(params.slug, body); // Call the server-side function safely
        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: "Failed to update car" }, { status: 500 });
    }
}
