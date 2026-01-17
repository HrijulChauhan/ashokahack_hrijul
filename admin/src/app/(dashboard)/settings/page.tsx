"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, Button, Input } from "@/components/ui";
import { restaurantInfo } from "@/lib/mockData";
import styles from "./page.module.css";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("restaurant");

    return (
        <>
            <Header
                title="Settings"
                subtitle="Manage your restaurant settings"
            />

            <div className={styles.container}>
                {/* Tabs */}
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'restaurant' ? styles.active : ''}`}
                        onClick={() => setActiveTab('restaurant')}
                    >
                        Restaurant Info
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'bags' ? styles.active : ''}`}
                        onClick={() => setActiveTab('bags')}
                    >
                        Bag Settings
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'notifications' ? styles.active : ''}`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        Notifications
                    </button>
                </div>

                {/* Restaurant Info */}
                {activeTab === 'restaurant' && (
                    <div className={styles.tabContent}>
                        <Card className={styles.settingsCard}>
                            <h3 className={styles.cardTitle}>Restaurant Details</h3>
                            <div className={styles.formGrid}>
                                <Input
                                    label="Restaurant Name"
                                    defaultValue={restaurantInfo.name}
                                />
                                <Input
                                    label="Email"
                                    type="email"
                                    defaultValue={restaurantInfo.email}
                                />
                                <Input
                                    label="Phone"
                                    type="tel"
                                    defaultValue={restaurantInfo.phone}
                                />
                                <Input
                                    label="City"
                                    defaultValue={restaurantInfo.city}
                                />
                            </div>
                        </Card>

                        <Card className={styles.settingsCard}>
                            <h3 className={styles.cardTitle}>Address</h3>
                            <Input
                                label="Full Address"
                                defaultValue={restaurantInfo.address}
                            />
                        </Card>

                        <div className={styles.actions}>
                            <Button variant="secondary">Cancel</Button>
                            <Button>Save Changes</Button>
                        </div>
                    </div>
                )}

                {/* Bag Settings */}
                {activeTab === 'bags' && (
                    <div className={styles.tabContent}>
                        <Card className={styles.settingsCard}>
                            <h3 className={styles.cardTitle}>Default Pickup Hours</h3>
                            <div className={styles.formGrid}>
                                <Input
                                    label="Pickup Start Time"
                                    type="time"
                                    defaultValue="19:00"
                                />
                                <Input
                                    label="Pickup End Time"
                                    type="time"
                                    defaultValue="20:30"
                                />
                            </div>
                            <p className={styles.helperText}>
                                Default pickup window for new rescue bags
                            </p>
                        </Card>

                        <Card className={styles.settingsCard}>
                            <h3 className={styles.cardTitle}>Bag Categories</h3>
                            <p className={styles.cardDescription}>
                                Select which bag categories you offer
                            </p>
                            <div className={styles.toggleList}>
                                {[
                                    { label: "Mixed Bakery", enabled: true },
                                    { label: "Pastries", enabled: true },
                                    { label: "Breads", enabled: true },
                                    { label: "Snacks", enabled: false },
                                ].map((item) => (
                                    <div key={item.label} className={styles.toggleItem}>
                                        <span className={styles.toggleLabel}>{item.label}</span>
                                        <label className={styles.toggle}>
                                            <input type="checkbox" defaultChecked={item.enabled} />
                                            <span className={styles.slider}></span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <div className={styles.actions}>
                            <Button variant="secondary">Cancel</Button>
                            <Button>Save Changes</Button>
                        </div>
                    </div>
                )}

                {/* Notifications */}
                {activeTab === 'notifications' && (
                    <div className={styles.tabContent}>
                        <Card className={styles.settingsCard}>
                            <h3 className={styles.cardTitle}>Order Notifications</h3>
                            <div className={styles.toggleList}>
                                {[
                                    { label: "New order received", description: "Get notified when someone reserves a bag", enabled: true },
                                    { label: "Pickup confirmed", description: "When a customer picks up their bag", enabled: true },
                                    { label: "Order cancelled", description: "When a reservation is cancelled", enabled: true },
                                    { label: "Daily summary", description: "End of day summary of sales", enabled: false },
                                ].map((item) => (
                                    <div key={item.label} className={styles.toggleItem}>
                                        <div className={styles.toggleInfo}>
                                            <span className={styles.toggleLabel}>{item.label}</span>
                                            <span className={styles.toggleDescription}>{item.description}</span>
                                        </div>
                                        <label className={styles.toggle}>
                                            <input type="checkbox" defaultChecked={item.enabled} />
                                            <span className={styles.slider}></span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <div className={styles.actions}>
                            <Button variant="secondary">Cancel</Button>
                            <Button>Save Changes</Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
