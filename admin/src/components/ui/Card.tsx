"use client";

import React from "react";
import styles from "./Card.module.css";

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: "none" | "sm" | "md" | "lg";
    hover?: boolean;
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = "",
    padding = "md",
    hover = false,
    onClick,
}) => {
    return (
        <div
            className={`${styles.card} ${styles[`padding-${padding}`]} ${hover ? styles.hover : ""} ${className}`}
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            {children}
        </div>
    );
};

// Stat Card - Used for dashboard summary cards
export interface StatCardProps {
    title: string;
    value: string | number;
    change?: number;
    changeLabel?: string;
    icon?: React.ReactNode;
    iconColor?: "accent" | "pink" | "success" | "warning" | "info";
}

export const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    change,
    changeLabel = "vs last period",
    icon,
    iconColor = "accent",
}) => {
    const isPositive = change !== undefined && change >= 0;

    return (
        <Card className={styles.statCard}>
            <div className={styles.statHeader}>
                <span className={styles.statTitle}>{title}</span>
                {icon && (
                    <div className={`${styles.statIcon} ${styles[`icon-${iconColor}`]}`}>
                        {icon}
                    </div>
                )}
            </div>
            <div className={styles.statValue}>{value}</div>
            {change !== undefined && (
                <div className={`${styles.statChange} ${isPositive ? styles.positive : styles.negative}`}>
                    <span>{isPositive ? "↑" : "↓"} {Math.abs(change)}%</span>
                    <span className={styles.changeLabel}>{changeLabel}</span>
                </div>
            )}
        </Card>
    );
};
