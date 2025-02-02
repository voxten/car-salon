import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import sql from "better-sqlite3";
import path from "path";
import bcrypt from "bcrypt"; // Dodaj import bcrypt

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
        // 1. Znajdź użytkownika po nazwie użytkownika
        console.log(db);
        const user = db
          .prepare("SELECT * FROM users WHERE username = ?")
          .get(credentials.username);

        if (!user) {
          return null;
        }

        // 2. Porównaj zahashowane hasło z podanym
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordsMatch) {
          return null;
        }

        // 3. Zwróć dane użytkownika bez hasła
        return {
          id: user.id,
          name: user.username,
          email: user.email,
          role: user.role,
        };
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