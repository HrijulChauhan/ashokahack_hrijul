"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, Button, StatusBadge } from "@/components/ui";
import { RescueBag } from "@/lib/types";
import { mockRescueBags, mockCategoryStats, formatCurrency, getCategoryLabel, formatTime } from "@/lib/mockData";
import styles from "./page.module.css";

export default function RescueBagsPage() {
    const [bags] = useState<RescueBag[]>(mockRescueBags);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filteredBags = selectedCategory
        ? bags.filter(b => b.category === selectedCategory)
        : bags;

    const categories = [
        { id: "veg_meals", label: "Vegetarian Meals", icon: "🥗", color: "success" },
        { id: "non_veg_meals", label: "Non-Veg Meals", icon: "🍗", color: "error" },
        { id: "mixed_bakery", label: "Mixed Bakery", icon: "🥐", color: "warning" },
        { id: "snacks", label: "Snacks", icon: "🥪", color: "info" },
        { id: "pastries", label: "Pastries", icon: "🧁", color: "pink" },
        { id: "mixed", label: "Mixed Items", icon: "🍱", color: "accent" },
    ];

    return (
        <>
            <Header
                title="Rescue Bags"
                subtitle="Manage bag categories and view active listings"
            />

            <div className={styles.container}>
                {/* Category Stats */}
                <section className={styles.categorySection}>
                    <h2 className={styles.sectionTitle}>Categories</h2>
                    <div className={styles.categoryGrid}>
                        {categories.map((cat) => {
                            const stats = mockCategoryStats.find(s => s.category === cat.id);
                            const isSelected = selectedCategory === cat.id;
                            return (
                                <Card
                                    key={cat.id}
                                    className={`${styles.categoryCard} ${isSelected ? styles.selected : ""}`}
                                    hover
                                    onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                                >
                                    <div className={styles.categoryIcon}>{cat.icon}</div>
                                    <div className={styles.categoryInfo}>
                                        <span className={styles.categoryName}>{cat.label}</span>
                                        <span className={styles.categorySold}>
                                            {stats?.totalSold.toLocaleString() || 0} sold
                                        </span>
                                    </div>
                                    {stats && (
                                        <div className={styles.categoryRevenue}>
                                            {formatCurrency(stats.revenue)}
                                        </div>
                                    )}
                                </Card>
                            );
                        })}
                    </div>
                </section>

                {/* Active Listings */}
                <section className={styles.listingsSection}>
                    <div className={styles.listingsHeader}>
                        <h2 className={styles.sectionTitle}>
                            Active Listings
                            {selectedCategory && (
                                <span className={styles.filterTag}>
                                    {getCategoryLabel(selectedCategory)}
                                    <button onClick={() => setSelectedCategory(null)}>×</button>
                                </span>
                            )}
                        </h2>
                        <div className={styles.listingsStats}>
                            <span className={styles.availableCount}>
                                {filteredBags.filter(b => b.status === 'available').length} available
                            </span>
                        </div>
                    </div>

                    <div className={styles.listingsGrid}>
                        {filteredBags.map((bag) => (
                            <Card key={bag.id} className={styles.bagCard}>
                                <div className={styles.bagHeader}>
                                    <div className={styles.bagMerchant}>
                                        <span className={styles.merchantName}>{bag.merchantName}</span>
                                        <StatusBadge status={bag.status} size="sm" />
                                    </div>
                                    <div className={styles.bagCategory}>
                                        {getCategoryLabel(bag.category)}
                                    </div>
                                </div>

                                <div className={styles.bagBody}>
                                    {bag.description && (
                                        <p className={styles.bagDescription}>{bag.description}</p>
                                    )}

                                    <div className={styles.bagDetails}>
                                        <div className={styles.bagQuantity}>
                                            <span className={styles.quantityLabel}>Remaining</span>
                                            <span className={styles.quantityValue}>
                                                {bag.quantityRemaining} / {bag.quantity}
                                            </span>
                                        </div>
                                        <div className={styles.bagPickup}>
                                            <span className={styles.pickupLabel}>Pickup</span>
                                            <span className={styles.pickupValue}>
                                                {formatTime(bag.pickupStart)} - {formatTime(bag.pickupEnd)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.bagFooter}>
                                    <div className={styles.bagPricing}>
                                        <span className={styles.originalPrice}>{formatCurrency(bag.originalValue)}</span>
                                        <span className={styles.salePrice}>{formatCurrency(bag.price)}</span>
                                    </div>
                                    <div className={styles.savingsTag}>
                                        Save {Math.round((1 - bag.price / bag.originalValue) * 100)}%
                                    </div>
                                </div>
                            </Card>
                        ))}

                        {filteredBags.length === 0 && (
                            <div className={styles.emptyState}>
                                <p>No bags found for this category</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Price Slabs */}
                <section className={styles.priceSection}>
                    <h2 className={styles.sectionTitle}>Price Slabs</h2>
                    <div className={styles.priceGrid}>
                        {[
                            { name: "Budget", range: "₹50 - ₹100", color: "success" },
                            { name: "Standard", range: "₹100 - ₹150", color: "info" },
                            { name: "Premium", range: "₹150 - ₹250", color: "warning" },
                            { name: "Special", range: "₹250+", color: "pink" },
                        ].map((slab) => (
                            <Card key={slab.name} className={styles.priceCard}>
                                <div className={`${styles.priceIndicator} ${styles[slab.color]}`} />
                                <div>
                                    <span className={styles.priceName}>{slab.name}</span>
                                    <span className={styles.priceRange}>{slab.range}</span>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
