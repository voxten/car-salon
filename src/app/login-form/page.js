"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./login-form.module.css";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password
    });
  
    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/");
    }

    try {
      // Wyślij zapytanie do API logowania
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      // Obsługuje błąd w przypadku niepowodzenia logowania
      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Invalid credentials");
      }

      // Po pomyślnym logowaniu przekierowujemy użytkownika
      router.push("/");
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginHeading}>Login to Car Rental</h1>

      {error && (
        <div className={styles.loginError}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.loginFormGroup}>
          <label className={styles.loginLabel}>
            Username:
            <input
              type="text"
              className={styles.loginInput}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </label>
        </div>

        <div className={styles.loginFormGroup}>
          <label className={styles.loginLabel}>
            Password:
            <input
              type="password"
              className={styles.loginInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </label>
        </div>

        <button 
          type="submit" 
          className={styles.loginButton}
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        <div className={styles.loginSwitchText}>
          <p>Don't have an account?</p>
          <Link 
            href="/register" 
            className={styles.loginSwitchLink}
            aria-disabled={isLoading}
          >
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
}
