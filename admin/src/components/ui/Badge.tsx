"use client";

import React from "react";
import styles from "./Badge.module.css";

export interface BadgeProps {
    children: React.ReactNode;
    variant?: "success" | "warning" | "error" | "info" | "neutral" | "pink";
    size?: "sm" | "md";
    dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = "neutral",
    size = "md",
    dot = false,
}) => {
    return (
        <span className={`${styles.badge} ${styles[variant]} ${styles[size]}`}>
            {dot && <span className={styles.dot} />}
            {children}
        </span>
    );
};

// Status Badge - Automatically maps status strings to variants
export interface StatusBadgeProps {
    status: string;
    size?: "sm" | "md";
}

const statusVariantMap: Record<string, BadgeProps["variant"]> = {
    active: "success",
    inactive: "neutral",
    pending: "warning",
    suspended: "error",
    banned: "error",
    available: "success",
    sold_out: "info",
    expired: "neutral",
    cancelled: "error",
    reserved: "warning",
    confirmed: "info",
    picked_up: "success",
    no_show: "error",
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = "md" }) => {
    const variant = statusVariantMap[status] || "neutral";
    const label = status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

    return (
        <Badge variant={variant} size={size} dot>
            {label}
        </Badge>
    );
};
