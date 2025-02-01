"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from './register.module.css';

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Walidacja
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Przekieruj do logowania po udanej rejestracji
      router.push("/login-form");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h1 className={styles.registerHeading}>Register</h1>
      {error && <p className={styles.registerErrorMessage}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.registerFormGroup}>
          <label className={styles.registerLabel}>Username:</label>
          <input
            type="text"
            className={styles.registerInput}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.registerFormGroup}>
          <label className={styles.registerLabel}>Email:</label>
          <input
            type="email"
            className={styles.registerInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.registerFormGroup}>
          <label className={styles.registerLabel}>Password:</label>
          <input
            type="password"
            className={styles.registerInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.registerFormGroup}>
          <label className={styles.registerLabel}>Confirm Password:</label>
          <input
            type="password"
            className={styles.registerInput}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.registerButton}>
          Register
        </button>
      </form>
      <p className={styles.registerSwitchText}>
        Already have an account?{" "}
        <Link href="/login-form" className={styles.registerSwitchLink}>
          Login here
        </Link>
      </p>
    </div>
  );
}
