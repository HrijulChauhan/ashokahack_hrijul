"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, Button, DataTable, StatusBadge } from "@/components/ui";
import { Order } from "@/lib/types";
import { mockOrders, formatCurrency, getCategoryLabel, formatTime, formatDate } from "@/lib/mockData";
import styles from "./page.module.css";

export default function OrdersPage() {
    const [orders] = useState<Order[]>(mockOrders);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);

    const filteredOrders = statusFilter
        ? orders.filter(o => o.status === statusFilter)
        : orders;

    const statusCounts = {
        reserved: orders.filter(o => o.status === 'reserved').length,
        confirmed: orders.filter(o => o.status === 'confirmed').length,
        picked_up: orders.filter(o => o.status === 'picked_up').length,
        cancelled: orders.filter(o => o.status === 'cancelled').length,
        no_show: orders.filter(o => o.status === 'no_show').length,
    };

    const columns = [
        {
            key: "id",
            header: "Order ID",
            render: (order: Order) => (
                <span className={styles.orderId}>#{order.id.toUpperCase()}</span>
            ),
        },
        {
            key: "consumer",
            header: "Consumer",
            render: (order: Order) => (
                <div className={styles.personCell}>
                    <span className={styles.personName}>{order.consumerName}</span>
                </div>
            ),
        },
        {
            key: "merchant",
            header: "Merchant",
            render: (order: Order) => (
                <div className={styles.personCell}>
                    <span className={styles.personName}>{order.merchantName}</span>
                    <span className={styles.bagCategory}>{getCategoryLabel(order.bagCategory)}</span>
                </div>
            ),
        },
        {
            key: "pickupTime",
            header: "Pickup Time",
            render: (order: Order) => (
                <div className={styles.timeCell}>
                    <span className={styles.time}>{formatTime(order.pickupTime)}</span>
                    <span className={styles.date}>{formatDate(order.createdAt)}</span>
                </div>
            ),
        },
        {
            key: "pickupCode",
            header: "Code",
            render: (order: Order) => (
                <span className={styles.pickupCode}>{order.pickupCode}</span>
            ),
        },
        {
            key: "price",
            header: "Amount",
            render: (order: Order) => (
                <span className={styles.amount}>{formatCurrency(order.price)}</span>
            ),
        },
        {
            key: "status",
            header: "Status",
            render: (order: Order) => (
                <StatusBadge status={order.status} size="sm" />
            ),
        },
        {
            key: "actions",
            header: "",
            render: (order: Order) => (
                <button className={styles.actionBtn} title="View Details">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                    </svg>
                </button>
            ),
        },
    ];

    return (
        <>
            <Header
                title="Orders"
                subtitle="Manage pickups and reservations"
            />

            <div className={styles.container}>
                {/* Status Filters */}
                <div className={styles.statusFilters}>
                    <button
                        className={`${styles.statusFilter} ${statusFilter === null ? styles.active : ''}`}
                        onClick={() => setStatusFilter(null)}
                    >
                        <span>All</span>
                        <span className={styles.count}>{orders.length}</span>
                    </button>
                    <button
                        className={`${styles.statusFilter} ${styles.reserved} ${statusFilter === 'reserved' ? styles.active : ''}`}
                        onClick={() => setStatusFilter('reserved')}
                    >
                        <span>Reserved</span>
                        <span className={styles.count}>{statusCounts.reserved}</span>
                    </button>
                    <button
                        className={`${styles.statusFilter} ${styles.confirmed} ${statusFilter === 'confirmed' ? styles.active : ''}`}
                        onClick={() => setStatusFilter('confirmed')}
                    >
                        <span>Confirmed</span>
                        <span className={styles.count}>{statusCounts.confirmed}</span>
                    </button>
                    <button
                        className={`${styles.statusFilter} ${styles.picked_up} ${statusFilter === 'picked_up' ? styles.active : ''}`}
                        onClick={() => setStatusFilter('picked_up')}
                    >
                        <span>Picked Up</span>
                        <span className={styles.count}>{statusCounts.picked_up}</span>
                    </button>
                    <button
                        className={`${styles.statusFilter} ${styles.cancelled} ${statusFilter === 'cancelled' ? styles.active : ''}`}
                        onClick={() => setStatusFilter('cancelled')}
                    >
                        <span>Cancelled</span>
                        <span className={styles.count}>{statusCounts.cancelled}</span>
                    </button>
                </div>

                {/* Today's Summary */}
                <div className={styles.todaySummary}>
                    <Card className={styles.summaryCard}>
                        <div className={styles.summaryIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                        </div>
                        <div className={styles.summaryContent}>
                            <span className={styles.summaryLabel}>Today&apos;s Pickups</span>
                            <span className={styles.summaryValue}>{orders.length}</span>
                        </div>
                    </Card>
                    <Card className={styles.summaryCard}>
                        <div className={`${styles.summaryIcon} ${styles.success}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <div className={styles.summaryContent}>
                            <span className={styles.summaryLabel}>Completed</span>
                            <span className={styles.summaryValue}>{statusCounts.picked_up}</span>
                        </div>
                    </Card>
                    <Card className={styles.summaryCard}>
                        <div className={`${styles.summaryIcon} ${styles.warning}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                        </div>
                        <div className={styles.summaryContent}>
                            <span className={styles.summaryLabel}>Pending</span>
                            <span className={styles.summaryValue}>{statusCounts.reserved + statusCounts.confirmed}</span>
                        </div>
                    </Card>
                    <Card className={styles.summaryCard}>
                        <div className={`${styles.summaryIcon} ${styles.accent}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="1" x2="12" y2="23" />
                                <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                            </svg>
                        </div>
                        <div className={styles.summaryContent}>
                            <span className={styles.summaryLabel}>Revenue</span>
                            <span className={styles.summaryValue}>{formatCurrency(orders.reduce((acc, o) => acc + o.price, 0))}</span>
                        </div>
                    </Card>
                </div>

                {/* Orders Table */}
                <DataTable
                    data={filteredOrders}
                    columns={columns}
                    keyExtractor={(o) => o.id}
                    emptyMessage="No orders found"
                />
            </div>
        </>
    );
}
