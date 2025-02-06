"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./reservations-form.module.css";

export default function AdminReservations() {
  const { data: session, status } = useSession();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (status === "authenticated" && session.user.role === "admin") {
      fetchReservations();
    }
  }, [status, session]);

  const fetchReservations = async () => {
    try {
      const response = await fetch(`/api/admin/reservations`);
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

  const deleteReservation = async (id) => {
    if (!confirm("Are you sure you want to delete this reservation?")) return;
    try {
      const response = await fetch(`/api/admin/reservations`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to delete reservation");
      }
      setReservations(reservations.filter((res) => res.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const editReservation = (reservation) => {
    setEditing(reservation.id);
    setEditData(reservation);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    try {
      const response = await fetch(`/api/admin/reservations`, {
        method: "PUT",
        body: JSON.stringify(editData),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to update reservation");
      }
      setReservations(reservations.map(res => res.id === editData.id ? editData : res));
      setEditing(null);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading reservations...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Reservations</h1>
      {reservations.length > 0 ? (
        <ul className={styles.reservationsList}>
          {reservations.map((reservation) => (
            <li key={reservation.id} className={styles.reservationItem}>
                        {editing === reservation.id ? (
                <div className={styles.editForm}>
                    <div>
                        <p className={styles.p1}><strong>Start Date:</strong></p>

                      
                        
                        <input 
                            name="start_date" 
                            value={editData.start_date} 
                            onChange={handleEditChange} 
                        />
                    
                    <p className={styles.p2}><strong>End Date:</strong></p>
                
                        <input 
                            name="end_date" 
                            value={editData.end_date} 
                            onChange={handleEditChange} 
                        />
                    
                    <p className={styles.p3}><strong>Total Amount:</strong></p>
                        <input 
                            name="total_amount" 
                            value={editData.total_amount} 
                            onChange={handleEditChange} 
                        />
                    </div>
                    
                    <button onClick={saveEdit} className={styles.saveButton}>Save</button>
                    <button onClick={() => setEditing(null)} className={styles.cancelButton}>Cancel</button>
                </div>
            ) : (
                
                <div className={styles.reservationText}>
                     <div className={styles.imageWrapper}>
                        <img src={reservation.image} alt={reservation.car_name} className={styles.carImage} />
                    </div>
                    <div className={styles.textDiv}>
                    <p>
                        <strong>Car:</strong> 
                        <Link href={`/rent-a-car/${reservation.slug}`} className={styles.carLink}>
                            {reservation.car_name}
                        </Link>
                    </p>
                    <p><strong>User ID:</strong> {reservation.user_id}</p>
                    <p><strong>Start Date:</strong> {reservation.start_date}</p>
                    <p><strong>End Date:</strong> {reservation.end_date}</p>
                    <p><strong>Total Amount:</strong> {reservation.total_amount}</p>
                    <p><strong>Status:</strong> {reservation.status}</p>
                    </div>
                        </div>
            )}
              <div className={styles.actions}>
                <button onClick={() => editReservation(reservation)} className={styles.editButton}>Edit</button>
                <button 
                  onClick={() => deleteReservation(reservation.id)} 
                  className={styles.deleteButton}>X</button>
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
