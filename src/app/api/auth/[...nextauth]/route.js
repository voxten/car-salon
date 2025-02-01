import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import sql from "better-sqlite3";
import path from "path";

// Inicjalizacja połączenia z bazą danych
const dbPath = path.resolve(process.cwd(), "car_salon.db");
const db = sql(dbPath);

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Zapytanie do bazy danych, aby znaleźć użytkownika
        const user = db
          .prepare("SELECT * FROM users WHERE username = ? AND password = ?")
          .get(credentials.username, credentials.password);

        if (user) {
          // Zwróć obiekt użytkownika, jeśli znaleziono
          return {
            id: user.id,
            name: user.username,
            email: user.email,
            role: user.role, // Zakładamy, że w bazie jest kolumna `role`
          };
        } else {
          // Zwróć null, jeśli użytkownik nie został znaleziony
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Dodaj rolę do tokena JWT
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role; // Dodaj rolę do sesji
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };