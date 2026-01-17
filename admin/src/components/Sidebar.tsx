"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

// Restaurant name - would come from context/auth in real app
const RESTAURANT_NAME = "Baker's Oven";

const navItems = [
    {
        label: "Dashboard",
        href: "/",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="9" rx="1" />
                <rect x="14" y="3" width="7" height="5" rx="1" />
                <rect x="14" y="12" width="7" height="9" rx="1" />
                <rect x="3" y="16" width="7" height="5" rx="1" />
            </svg>
        ),
    },
    {
        label: "Rescue Bags",
        href: "/rescue-bags",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
            </svg>
        ),
    },
    {
        label: "Orders",
        href: "/orders",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <path d="M9 14l2 2 4-4" />
            </svg>
        ),
    },
    {
        label: "Settings",
        href: "/settings",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
        ),
    },
];

export const Sidebar: React.FC = () => {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
            {/* Restaurant Logo/Name */}
            <div className={styles.logo}>
                <div className={styles.logoIcon}>
                    <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                        {/* Bag shape */}
                        <path
                            d="M8 12C8 10 10 8 12 8H28C30 8 32 10 32 12V32C32 34 30 36 28 36H12C10 36 8 34 8 32V12Z"
                            fill="#E88BC3"
                        />
                        {/* Handles */}
                        <path
                            d="M14 8V6C14 4 16 2 20 2C24 2 26 4 26 6V8"
                            stroke="#E88BC3"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                        {/* Heart cutout */}
                        <path
                            d="M20 28C20 28 14 22 14 18C14 15 16 14 18 14C19 14 20 15 20 16C20 15 21 14 22 14C24 14 26 15 26 18C26 22 20 28 20 28Z"
                            fill="#0D3B2E"
                        />
                    </svg>
                </div>
                {!isCollapsed && (
                    <div className={styles.logoText}>
                        <span className={styles.restaurantName}>{RESTAURANT_NAME}</span>
                        <span className={styles.poweredBy}>Powered by Spare</span>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className={styles.nav}>
                {navItems.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href !== "/" && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                            title={isCollapsed ? item.label : undefined}
                        >
                            <span className={styles.navIcon}>{item.icon}</span>
                            {!isCollapsed && <span className={styles.navLabel}>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Collapse Toggle */}
            <button
                className={styles.collapseBtn}
                onClick={() => setIsCollapsed(!isCollapsed)}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ transform: isCollapsed ? "rotate(180deg)" : "none" }}
                >
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            {/* Footer */}
            <div className={styles.footer}>
                <button className={styles.logoutBtn}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
};
