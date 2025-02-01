"use client"; // This directive is required because we're using client-side interactivity

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import styles from "./login-form.module.css";

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
    <div className={styles.loginContainer}>
      <h1 className={styles.loginHeading}>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.loginFormGroup}>
          <label className={styles.loginLabel}>Username:</label>
          <input
            type="text"
            className={styles.loginInput}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.loginFormGroup}>
          <label className={styles.loginLabel}>Password:</label>
          <input
            type="password"
            className={styles.loginInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.loginButton}>
          Sign In
        </button>
        <div className={styles.loginSwitchText}>
          <p>Don't have an account?</p>
          <Link href="/register" className={styles.loginSwitchLink}>
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
}
