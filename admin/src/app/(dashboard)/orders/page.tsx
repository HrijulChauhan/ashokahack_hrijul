"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, StatusBadge } from "@/components/ui";
import { Order } from "@/lib/types";
import { mockOrders, formatCurrency, getCategoryLabel, formatTime } from "@/lib/mockData";
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
    };

    return (
        <>
            <Header
                title="Orders"
                subtitle="Today's pickups and reservations"
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
                </div>

                {/* Summary Cards */}
                <div className={styles.summaryRow}>
                    <Card className={styles.summaryCard}>
                        <span className={styles.summaryValue}>{orders.length}</span>
                        <span className={styles.summaryLabel}>Total Orders</span>
                    </Card>
                    <Card className={styles.summaryCard}>
                        <span className={`${styles.summaryValue} ${styles.pending}`}>
                            {statusCounts.reserved + statusCounts.confirmed}
                        </span>
                        <span className={styles.summaryLabel}>Pending Pickup</span>
                    </Card>
                    <Card className={styles.summaryCard}>
                        <span className={`${styles.summaryValue} ${styles.success}`}>{statusCounts.picked_up}</span>
                        <span className={styles.summaryLabel}>Completed</span>
                    </Card>
                    <Card className={styles.summaryCard}>
                        <span className={`${styles.summaryValue} ${styles.revenue}`}>
                            {formatCurrency(orders.reduce((acc, o) => acc + o.price, 0))}
                        </span>
                        <span className={styles.summaryLabel}>Revenue</span>
                    </Card>
                </div>

                {/* Orders List */}
                <div className={styles.ordersList}>
                    {filteredOrders.map((order) => (
                        <Card key={order.id} className={styles.orderCard}>
                            <div className={styles.orderMain}>
                                <div className={styles.orderCustomer}>
                                    <span className={styles.customerName}>{order.consumerName}</span>
                                    <span className={styles.orderCategory}>{getCategoryLabel(order.bagCategory)}</span>
                                </div>
                                <div className={styles.orderTime}>
                                    <span className={styles.timeLabel}>Pickup</span>
                                    <span className={styles.timeValue}>{formatTime(order.pickupTime)}</span>
                                </div>
                                <div className={styles.orderCode}>
                                    <span className={styles.codeLabel}>Code</span>
                                    <span className={styles.codeValue}>{order.pickupCode}</span>
                                </div>
                                <div className={styles.orderPrice}>
                                    {formatCurrency(order.price)}
                                </div>
                                <StatusBadge status={order.status} size="sm" />
                            </div>
                            {order.feedback && (
                                <div className={styles.orderFeedback}>
                                    <span className={styles.rating}>★ {order.rating}</span>
                                    <span className={styles.feedback}>&quot;{order.feedback}&quot;</span>
                                </div>
                            )}
                        </Card>
                    ))}

                    {filteredOrders.length === 0 && (
                        <div className={styles.emptyState}>
                            <p>No orders found</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
