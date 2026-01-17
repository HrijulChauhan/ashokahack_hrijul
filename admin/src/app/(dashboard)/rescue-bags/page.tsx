"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, Button, StatusBadge } from "@/components/ui";
import { RescueBag } from "@/lib/types";
import { mockRescueBags, formatCurrency, getCategoryLabel, formatTime } from "@/lib/mockData";
import styles from "./page.module.css";

export default function RescueBagsPage() {
    const [bags, setBags] = useState<RescueBag[]>(mockRescueBags);

    const availableBags = bags.filter(b => b.status === 'available');
    const soldOutBags = bags.filter(b => b.status === 'sold_out');

    return (
        <>
            <Header
                title="Rescue Bags"
                subtitle="Manage today's surplus food bags"
            />

            <div className={styles.container}>
                {/* Quick Stats */}
                <div className={styles.quickStats}>
                    <Card className={styles.statCard}>
                        <span className={styles.statValue}>{bags.length}</span>
                        <span className={styles.statLabel}>Total Bags</span>
                    </Card>
                    <Card className={styles.statCard}>
                        <span className={`${styles.statValue} ${styles.available}`}>{availableBags.length}</span>
                        <span className={styles.statLabel}>Available</span>
                    </Card>
                    <Card className={styles.statCard}>
                        <span className={`${styles.statValue} ${styles.soldOut}`}>{soldOutBags.length}</span>
                        <span className={styles.statLabel}>Sold Out</span>
                    </Card>
                    <Card className={styles.statCard}>
                        <span className={styles.statValue}>
                            {bags.reduce((acc, b) => acc + b.quantity - b.quantityRemaining, 0)}
                        </span>
                        <span className={styles.statLabel}>Sold Today</span>
                    </Card>
                </div>

                {/* Add New Bag */}
                <div className={styles.addSection}>
                    <Button>+ Add New Bag</Button>
                </div>

                {/* Bags List */}
                <section className={styles.bagsSection}>
                    <h2 className={styles.sectionTitle}>Today&apos;s Bags</h2>
                    <div className={styles.bagsGrid}>
                        {bags.map((bag) => (
                            <Card key={bag.id} className={styles.bagCard}>
                                <div className={styles.bagHeader}>
                                    <span className={styles.bagCategory}>{getCategoryLabel(bag.category)}</span>
                                    <StatusBadge status={bag.status} size="sm" />
                                </div>

                                {bag.description && (
                                    <p className={styles.bagDescription}>{bag.description}</p>
                                )}

                                <div className={styles.bagDetails}>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>Quantity</span>
                                        <span className={styles.detailValue}>
                                            {bag.quantityRemaining} / {bag.quantity} remaining
                                        </span>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>Pickup Window</span>
                                        <span className={styles.detailValue}>
                                            {formatTime(bag.pickupStart)} - {formatTime(bag.pickupEnd)}
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.bagFooter}>
                                    <div className={styles.pricing}>
                                        <span className={styles.originalPrice}>{formatCurrency(bag.originalValue)}</span>
                                        <span className={styles.salePrice}>{formatCurrency(bag.price)}</span>
                                    </div>
                                    <span className={styles.savings}>
                                        {Math.round((1 - bag.price / bag.originalValue) * 100)}% off
                                    </span>
                                </div>

                                <div className={styles.bagActions}>
                                    <Button variant="secondary" size="sm">Edit</Button>
                                    {bag.status === 'available' && bag.quantityRemaining > 0 && (
                                        <Button variant="ghost" size="sm">Mark Sold Out</Button>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
