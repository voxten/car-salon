"use client"; // This directive is required because we're using client-side interactivity

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import styles from "./page.module.css";
export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      alert(result.error);
    } else {
      window.location.href = "/"; // Redirect to the homepage after login
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign In</button>
        <div className={styles.registerSection}>
          <p>Don't have an account?</p>
          <Link href="/register" className={styles.registerLink}>
            Create Account
          </Link>
        </div>
      </form>
      
    </div>
  );
}