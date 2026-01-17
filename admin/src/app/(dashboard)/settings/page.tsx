"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, Button, Input } from "@/components/ui";
import styles from "./page.module.css";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general");

    return (
        <>
            <Header
                title="Settings"
                subtitle="Manage platform configuration"
            />

            <div className={styles.container}>
                {/* Tabs */}
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'general' ? styles.active : ''}`}
                        onClick={() => setActiveTab('general')}
                    >
                        General
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'pricing' ? styles.active : ''}`}
                        onClick={() => setActiveTab('pricing')}
                    >
                        Pricing Rules
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'notifications' ? styles.active : ''}`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        Notifications
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'admins' ? styles.active : ''}`}
                        onClick={() => setActiveTab('admins')}
                    >
                        Admin Users
                    </button>
                </div>

                {/* General Settings */}
                {activeTab === 'general' && (
                    <div className={styles.tabContent}>
                        <Card className={styles.settingsCard}>
                            <h3 className={styles.cardTitle}>Platform Information</h3>
                            <div className={styles.formGrid}>
                                <Input
                                    label="Platform Name"
                                    defaultValue="Spare"
                                />
                                <Input
                                    label="Support Email"
                                    type="email"
                                    defaultValue="support@spare.in"
                                />
                                <Input
                                    label="Contact Phone"
                                    type="tel"
                                    defaultValue="+91 1800-SPARE"
                                />
                                <Input
                                    label="Website URL"
                                    type="url"
                                    defaultValue="https://spare.in"
                                />
                            </div>
                        </Card>

                        <Card className={styles.settingsCard}>
                            <h3 className={styles.cardTitle}>Operating Hours</h3>
                            <div className={styles.formGrid}>
                                <Input
                                    label="Default Pickup Start"
                                    type="time"
                                    defaultValue="18:00"
                                />
                                <Input
                                    label="Default Pickup End"
                                    type="time"
                                    defaultValue="22:00"
                                />
                            </div>
                            <p className={styles.helperText}>
                                These are the default pickup window hours shown to merchants when creating rescue bags.
                            </p>
                        </Card>

                        <Card className={styles.settingsCard}>
                            <h3 className={styles.cardTitle}>Localization</h3>
                            <div className={styles.formGrid}>
                                <div className={styles.selectWrapper}>
                                    <label className={styles.label}>Currency</label>
                                    <select className={styles.select} defaultValue="INR">
                                        <option value="INR">Indian Rupee (₹)</option>
                                        <option value="USD">US Dollar ($)</option>
                                    </select>
                                </div>
                                <div className={styles.selectWrapper}>
                                    <label className={styles.label}>Timezone</label>
                                    <select className={styles.select} defaultValue="IST">
                                        <option value="IST">IST (UTC+5:30)</option>
                                        <option value="UTC">UTC</option>
                                    </select>
                                </div>
                            </div>
                        </Card>

                        <div className={styles.actions}>
                            <Button variant="secondary">Cancel</Button>
                            <Button>Save Changes</Button>
                        </div>
                    </div>
                )}

                {/* Pricing Rules */}
                {activeTab === 'pricing' && (
                    <div className={styles.tabContent}>
                        <Card className={styles.settingsCard}>
                            <h3 className={styles.cardTitle}>Price Slabs</h3>
                            <p className={styles.cardDescription}>
                                Define price ranges for rescue bags. Merchants will select from these slabs when listing.
                            </p>
                            <div className={styles.priceSlabs}>
                                {[
                                    { name: "Budget", min: 50, max: 100 },
                                    { name: "Standard", min: 100, max: 150 },
                                    { name: "Premium", min: 150, max: 250 },
                                    { name: "Special", min: 250, max: 500 },
                                ].map((slab) => (
                                    <div key={slab.name} className={styles.priceSlab}>
                                        <span className={styles.slabName}>{slab.name}</span>
                                        <div className={styles.slabRange}>
                                            <Input
                                                type="number"
                                                defaultValue={slab.min}
                                                className={styles.slabInput}
                                            />
                                            <span>to</span>
                                            <Input
                                                type="number"
                                                defaultValue={slab.max}
                                                className={styles.slabInput}
                                            />
                                        </div>
                                        <button className={styles.deleteBtn}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <Button variant="secondary" className={styles.addBtn}>
                                + Add Price Slab
                            </Button>
                        </Card>

                        <Card className={styles.settingsCard}>
                            <h3 className={styles.cardTitle}>Commission Settings</h3>
                            <div className={styles.formGrid}>
                                <Input
                                    label="Platform Commission (%)"
                                    type="number"
                                    defaultValue="10"
                                />
                                <Input
                                    label="Minimum Order Value (₹)"
                                    type="number"
                                    defaultValue="50"
                                />
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
                            <h3 className={styles.cardTitle}>Email Notifications</h3>
                            <div className={styles.toggleList}>
                                {[
                                    { label: "New merchant registration", description: "Get notified when a new merchant signs up", enabled: true },
                                    { label: "Daily summary", description: "Receive a daily summary of platform activity", enabled: true },
                                    { label: "Low inventory alerts", description: "Alert when rescue bags are running low", enabled: false },
                                    { label: "Critical issues", description: "Immediate notification for system issues", enabled: true },
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

                        <Card className={styles.settingsCard}>
                            <h3 className={styles.cardTitle}>Push Notifications</h3>
                            <div className={styles.toggleList}>
                                {[
                                    { label: "Order updates", description: "Real-time updates for new orders", enabled: true },
                                    { label: "Chat messages", description: "Notify when merchants send messages", enabled: true },
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

                {/* Admin Users */}
                {activeTab === 'admins' && (
                    <div className={styles.tabContent}>
                        <Card className={styles.settingsCard}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>Admin Users</h3>
                                <Button size="sm">+ Add Admin</Button>
                            </div>
                            <div className={styles.adminList}>
                                {[
                                    { name: "Admin User", email: "admin@spare.in", role: "Super Admin", lastLogin: "Today at 10:30 AM" },
                                    { name: "Support Team", email: "support@spare.in", role: "Moderator", lastLogin: "Yesterday at 5:45 PM" },
                                ].map((admin) => (
                                    <div key={admin.email} className={styles.adminItem}>
                                        <div className={styles.adminAvatar}>
                                            {admin.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className={styles.adminInfo}>
                                            <span className={styles.adminName}>{admin.name}</span>
                                            <span className={styles.adminEmail}>{admin.email}</span>
                                        </div>
                                        <div className={styles.adminRole}>
                                            <span className={`${styles.roleBadge} ${admin.role === 'Super Admin' ? styles.super : ''}`}>
                                                {admin.role}
                                            </span>
                                        </div>
                                        <div className={styles.adminLastLogin}>
                                            <span className={styles.lastLoginLabel}>Last login</span>
                                            <span>{admin.lastLogin}</span>
                                        </div>
                                        <button className={styles.moreBtn}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="1" />
                                                <circle cx="19" cy="12" r="1" />
                                                <circle cx="5" cy="12" r="1" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </>
    );
}
