import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          // 1. Znajdź użytkownika w PostgreSQL
          const result = await sql`
            SELECT * FROM users 
            WHERE username = ${credentials.username}
          `;

          if (result.rowCount === 0) return null;
          const user = result.rows[0];

          // 2. Porównaj zahashowane hasło
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) return null;

          // 3. Zwróć dane użytkownika
          return {
            id: user.id.toString(),
            name: user.username,
            email: user.email,
            role: user.role,
          };
          
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login-form",
    error: "/login-form",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };