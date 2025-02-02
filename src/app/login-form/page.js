"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./login-form.module.css";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

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
      
      {error && <div className={styles.loginError}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.loginFormGroup}>
          <label className={styles.loginLabel}>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className={styles.loginInput}
            />
          </label>
        </div>

        <div className={styles.loginFormGroup}>
          <label className={styles.loginLabel}>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className={styles.loginInput}
            />
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className={styles.loginButton}
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