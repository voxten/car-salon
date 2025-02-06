"use client";
import classes from "./page.module.css";
import {useSession} from "next-auth/react";
import Link from "next/link";

export default function AddButton() {
    const { data: session, status } = useSession();
    const isLoggedIn = status === "authenticated";
    const isAdmin = isLoggedIn && session?.user?.role === "admin";
    return (
        <div>
            {isLoggedIn && isAdmin && (
                <div className={classes.actions}>
                    <Link href={`/rent-a-car/create-new`}>Add New Car</Link>
                </div>
            )}
        </div>
    )
}