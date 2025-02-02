import { insertCar } from "@/app/lib/cars";

export async function POST(req) {
    try {
        const body = await req.json();
        console.log("Received Data:", body);

        if (!body.slug) {
            return new Response(JSON.stringify({ error: "Slug is required" }), { status: 400 });
        }

        const result = await insertCar(body);

        if (result.success) {
            return new Response(JSON.stringify({ message: "Car inserted successfully" }), { status: 201 });
        } else {
            return new Response(JSON.stringify({ error: result.error }), { status: 500 });
        }
    } catch (error) {
        console.error("Error in API route:", error.message);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

