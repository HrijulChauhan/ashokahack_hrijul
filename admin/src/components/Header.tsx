"use client";

import React from "react";
import { SearchInput } from "./ui";
import styles from "./Header.module.css";

interface HeaderProps {
    title: string;
    subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <h1 className={styles.title}>{title}</h1>
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>

            <div className={styles.right}>
                {/* Search */}
                <div className={styles.search}>
                    <SearchInput placeholder="Search..." />
                </div>

                {/* Notifications */}
                <button className={styles.iconBtn} aria-label="Notifications">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 01-3.46 0" />
                    </svg>
                    <span className={styles.notificationDot} />
                </button>

                {/* Profile */}
                <button className={styles.profile}>
                    <div className={styles.avatar}>
                        <span>A</span>
                    </div>
                    <div className={styles.profileInfo}>
                        <span className={styles.profileName}>Admin User</span>
                        <span className={styles.profileRole}>Super Admin</span>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </button>
            </div>
        </header>
    );
};
