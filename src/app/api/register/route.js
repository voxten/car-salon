import { registerUser } from './insertuser';

export async function POST(request) {
    const { username, email, password, confirmPassword } = await request.json();

    // Walidacja danych
    if (!username || !email || !password || !confirmPassword) {
        return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }

    if (password !== confirmPassword) {
        return new Response(JSON.stringify({ message: "Passwords do not match!" }), { status: 400 });
    }

    // Wywołanie funkcji rejestracji
    const result = await registerUser(username, email, password, 'client');

    if (result.success) {
        return new Response(JSON.stringify({ message: result.message }), { status: 201 });
    } else {
        return new Response(JSON.stringify({ message: result.message }), { status: 500 });
    }
}
