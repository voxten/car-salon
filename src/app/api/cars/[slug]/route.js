import { updateCar } from "@/app/lib/cars";
import { deleteCar } from "@/app/lib/cars";

export async function PUT(req, { params }) {
    try {
        const body = await req.json();
        const { slug } = await params;
        await updateCar(slug, body);
        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: "Failed to update car" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { slug } = params;

        if (!slug) {
            return new Response(JSON.stringify({ error: "Slug is required" }), { status: 400 });
        }

        const result = await deleteCar(slug);

        if (result.success) {
            return new Response(JSON.stringify({ message: "Car deleted successfully" }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: result.error }), { status: 500 });
        }
    } catch (error) {
        console.error("Error in DELETE API route:", error.message);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

