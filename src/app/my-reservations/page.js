"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "./reservations-form.module.css";

export default function MyReservations() {
  const { data: session, status } = useSession();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "authenticated") {
      fetchReservations(session.user.id);
    }
  }, [status, session]);

  const fetchReservations = async (userId) => {
    try {
      const response = await fetch(`/api/reservations?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch reservations");
      }
      const data = await response.json();
      setReservations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div className={styles.message}>Please log in to view your reservations.</div>;
  }

  if (loading) {
    return <div className={styles.loading}>Loading reservations...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Reservations</h1>
      {reservations.length > 0 ? (
        <ul className={styles.reservationsList}>
          {reservations.map((reservation) => (
            <li key={reservation.id} className={styles.reservationItem}>
              <div className={styles.reservationText}>
                <p><strong>Car:</strong> {reservation.car_name}</p>
                <p><strong>Start Date:</strong> {reservation.start_date}</p>
                <p><strong>End Date:</strong> {reservation.end_date}</p>
                <p><strong>Total Amount:</strong> {reservation.total_amount}</p>
                <p><strong>Status:</strong> {reservation.status}</p>
              </div>
              <div className={styles.imageWrapper}>
                <img src={reservation.image} alt={reservation.car_name} className={styles.carImage} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.message}>No reservations found.</p>
      )}
    </div>
  );
}
