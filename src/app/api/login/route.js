import { loginUser } from './loginuser';

export async function POST(request) {
    const { username, password } = await request.json();

    // Walidacja
    if (!username || !password) {
        return new Response(JSON.stringify({ message: "Username and password are required" }), { status: 400 });
    }

    // Wywołanie funkcji logowania
    const result = await loginUser(username, password);

    if (result.success) {
        // Tutaj możesz dodać logikę zapisywania sesji lub tokenu JWT
        return new Response(JSON.stringify({ message: result.message, user: result.user }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: result.message }), { status: 401 });
    }
}
