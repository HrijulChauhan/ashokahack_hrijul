"use client";

import { Header } from "@/components/Header";
import { StatCard, Card } from "@/components/ui";
import {
    mockRestaurantStats,
    mockDailyStats,
    mockOrders,
    formatCurrency,
    getCategoryLabel
} from "@/lib/mockData";
import styles from "./page.module.css";

// Icons for stat cards
const RevenueIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
);

const BagsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
    </svg>
);

const RatingIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const WasteIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

export default function DashboardPage() {
    const stats = mockRestaurantStats;
    const recentOrders = mockOrders.slice(0, 5);

    return (
        <>
            <Header
                title="Dashboard"
                subtitle="Today's overview for your restaurant"
            />

            <div className={styles.container}>
                {/* Stats Grid */}
                <section className={styles.statsGrid}>
                    <StatCard
                        title="Today's Revenue"
                        value={formatCurrency(stats.todayRevenue)}
                        change={stats.revenueChange}
                        icon={<RevenueIcon />}
                        iconColor="accent"
                    />
                    <StatCard
                        title="Bags Sold Today"
                        value={stats.bagsSoldToday}
                        change={stats.bagsChange}
                        icon={<BagsIcon />}
                        iconColor="pink"
                    />
                    <StatCard
                        title="Average Rating"
                        value={stats.averageRating.toFixed(1)}
                        change={stats.ratingChange}
                        icon={<RatingIcon />}
                        iconColor="warning"
                    />
                    <StatCard
                        title="Waste Saved (kg)"
                        value={stats.wasteSaved.toLocaleString()}
                        change={stats.wasteChange}
                        icon={<WasteIcon />}
                        iconColor="success"
                    />
                </section>

                {/* Charts Section */}
                <section className={styles.chartsSection}>
                    {/* Revenue Chart */}
                    <Card className={styles.chartCard}>
                        <div className={styles.chartHeader}>
                            <h3 className={styles.chartTitle}>Revenue (Last 7 Days)</h3>
                        </div>
                        <div className={styles.chart}>
                            <div className={styles.barChart}>
                                {mockDailyStats.map((stat) => {
                                    const maxRevenue = Math.max(...mockDailyStats.map(s => s.revenue));
                                    const height = (stat.revenue / maxRevenue) * 100;
                                    return (
                                        <div key={stat.date} className={styles.barContainer}>
                                            <div
                                                className={styles.bar}
                                                style={{ height: `${height}%` }}
                                                title={`${formatCurrency(stat.revenue)}`}
                                            />
                                            <span className={styles.barLabel}>
                                                {new Date(stat.date).toLocaleDateString('en-IN', { weekday: 'short' })}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Card>

                    {/* Today's Bags */}
                    <Card className={styles.chartCard}>
                        <div className={styles.chartHeader}>
                            <h3 className={styles.chartTitle}>Today&apos;s Rescue Bags</h3>
                        </div>
                        <div className={styles.bagsOverview}>
                            <div className={styles.bagStat}>
                                <span className={styles.bagStatValue}>{stats.bagsAvailable}</span>
                                <span className={styles.bagStatLabel}>Available</span>
                            </div>
                            <div className={styles.bagStat}>
                                <span className={styles.bagStatValue}>{stats.bagsSoldToday}</span>
                                <span className={styles.bagStatLabel}>Sold</span>
                            </div>
                            <div className={styles.bagStat}>
                                <span className={styles.bagStatValue}>{stats.pendingPickups}</span>
                                <span className={styles.bagStatLabel}>Pending Pickup</span>
                            </div>
                        </div>
                        <a href="/rescue-bags" className={styles.manageLink}>
                            Manage Bags →
                        </a>
                    </Card>
                </section>

                {/* Recent Orders */}
                <section className={styles.recentSection}>
                    <Card padding="none">
                        <div className={styles.sectionHeader}>
                            <h3 className={styles.sectionTitle}>Recent Pickups</h3>
                            <a href="/orders" className={styles.viewAll}>View All →</a>
                        </div>
                        <div className={styles.ordersList}>
                            {recentOrders.map((order) => (
                                <div key={order.id} className={styles.orderItem}>
                                    <div className={styles.orderInfo}>
                                        <span className={styles.orderConsumer}>{order.consumerName}</span>
                                        <span className={styles.orderTime}>
                                            Pickup: {new Date(order.pickupTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <div className={styles.orderDetails}>
                                        <span className={styles.orderCategory}>{getCategoryLabel(order.bagCategory)}</span>
                                        <span className={styles.orderPrice}>{formatCurrency(order.price)}</span>
                                    </div>
                                    <div className={`${styles.orderStatus} ${styles[order.status]}`}>
                                        {order.status.replace('_', ' ')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </section>
            </div>
        </>
    );
}
