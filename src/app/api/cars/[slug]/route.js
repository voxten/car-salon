import { updateCar } from "@/app/lib/cars";

export async function PUT(req, { params }) {
    try {
        const body = await req.json();
        await updateCar(params.slug, body);
        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: "Failed to update car" }, { status: 500 });
    }
}
