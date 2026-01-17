"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { restaurantInfo } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Store, Clock, Save, Check } from "lucide-react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const tabs = [
        { key: "profile", label: "Profile", icon: Store },
        { key: "pickup", label: "Pickup Settings", icon: Clock },
    ];

    return (
        <>
            <Header
                title="Settings"
                subtitle="Manage your restaurant"
            />

            <div className="p-6">
                {/* Tabs */}
                <div className="flex gap-1 border-b border-white/10 mb-6">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px",
                                    activeTab === tab.key
                                        ? "text-accent border-accent"
                                        : "text-muted-foreground border-transparent hover:text-white"
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                <div className="max-w-2xl space-y-6">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <>
                            <Card className="bg-spare-bg-light border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-white">Restaurant Profile</CardTitle>
                                    <CardDescription className="font-serif">Your restaurant information as shown to customers</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Restaurant Name</Label>
                                        <Input
                                            id="name"
                                            defaultValue={restaurantInfo.name}
                                            className="bg-spare-bg border-white/10 text-white"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                defaultValue={restaurantInfo.phone}
                                                className="bg-spare-bg border-white/10 text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                defaultValue={restaurantInfo.email}
                                                className="bg-spare-bg border-white/10 text-white"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            defaultValue={`${restaurantInfo.address}, ${restaurantInfo.city}`}
                                            className="bg-spare-bg border-white/10 text-white"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-spare-bg-light border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-white">Account</CardTitle>
                                    <CardDescription className="font-serif">Manage your login credentials</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="current-password">Current Password</Label>
                                        <Input
                                            id="current-password"
                                            type="password"
                                            placeholder="Enter current password"
                                            className="bg-spare-bg border-white/10 text-white placeholder:text-muted-foreground"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="new-password">New Password</Label>
                                            <Input
                                                id="new-password"
                                                type="password"
                                                placeholder="Enter new password"
                                                className="bg-spare-bg border-white/10 text-white placeholder:text-muted-foreground"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirm-password">Confirm Password</Label>
                                            <Input
                                                id="confirm-password"
                                                type="password"
                                                placeholder="Confirm new password"
                                                className="bg-spare-bg border-white/10 text-white placeholder:text-muted-foreground"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex justify-end">
                                <Button onClick={handleSave} className="bg-pink hover:bg-pink-hover text-spare-bg">
                                    {saved ? (
                                        <>
                                            <Check className="w-4 h-4 mr-2" />
                                            Saved
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        </>
                    )}

                    {/* Pickup Settings Tab */}
                    {activeTab === 'pickup' && (
                        <>
                            <Card className="bg-spare-bg-light border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-white">Default Pickup Window</CardTitle>
                                    <CardDescription className="font-serif">Set the default pickup time when creating new bags</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="pickupStart">Start Time</Label>
                                            <Input
                                                id="pickupStart"
                                                type="time"
                                                defaultValue="19:00"
                                                className="bg-spare-bg border-white/10 text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="pickupEnd">End Time</Label>
                                            <Input
                                                id="pickupEnd"
                                                type="time"
                                                defaultValue="20:30"
                                                className="bg-spare-bg border-white/10 text-white"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-spare-bg-light border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-white">Default Pricing</CardTitle>
                                    <CardDescription className="font-serif">Set default values for new rescue bags</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="defaultPrice">Default Price (₹)</Label>
                                            <Input
                                                id="defaultPrice"
                                                type="number"
                                                defaultValue="120"
                                                className="bg-spare-bg border-white/10 text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="defaultOriginal">Original Value (₹)</Label>
                                            <Input
                                                id="defaultOriginal"
                                                type="number"
                                                defaultValue="400"
                                                className="bg-spare-bg border-white/10 text-white"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-spare-bg-light border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-white">Preferences</CardTitle>
                                    <CardDescription className="font-serif">Quick settings for your rescue bags</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label className="text-white font-normal">Auto-expire unsold bags</Label>
                                            <p className="text-xs text-muted-foreground mt-0.5">Automatically mark bags as expired after pickup window</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label className="text-white font-normal">Show as available immediately</Label>
                                            <p className="text-xs text-muted-foreground mt-0.5">New bags are visible to customers right away</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex justify-end">
                                <Button onClick={handleSave} className="bg-pink hover:bg-pink-hover text-spare-bg">
                                    {saved ? (
                                        <>
                                            <Check className="w-4 h-4 mr-2" />
                                            Saved
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
