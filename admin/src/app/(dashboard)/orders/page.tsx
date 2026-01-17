"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Order } from "@/lib/types";
import { mockOrders, formatCurrency, getCategoryLabel, formatTime } from "@/lib/mockData";
import { User, Package } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>(mockOrders);
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

    const handleMarkPickedUp = (orderId: string) => {
        setOrders(orders.map(o =>
            o.id === orderId ? { ...o, status: "picked_up" as const, completedAt: new Date().toISOString() } : o
        ));
    };

    const handleConfirmOrder = (orderId: string) => {
        setOrders(orders.map(o =>
            o.id === orderId ? { ...o, status: "confirmed" as const } : o
        ));
    };

    const filters = [
        { key: null, label: "All", count: orders.length },
        { key: "reserved", label: "Reserved", count: statusCounts.reserved, color: "yellow" },
        { key: "confirmed", label: "Confirmed", count: statusCounts.confirmed, color: "blue" },
        { key: "picked_up", label: "Picked Up", count: statusCounts.picked_up, color: "green" },
    ];

    return (
        <>
            <Header
                title="Orders"
                subtitle="Today's pickups and reservations"
            />

            <div className="p-6 space-y-6">
                {/* Status Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {filters.map((filter) => (
                        <Button
                            key={filter.key ?? 'all'}
                            variant="outline"
                            size="sm"
                            onClick={() => setStatusFilter(filter.key)}
                            className={cn(
                                "border-white/10 text-white hover:bg-white/5 whitespace-nowrap",
                                statusFilter === filter.key && filter.key === null && "bg-accent/10 border-accent text-accent",
                                statusFilter === filter.key && filter.key === "reserved" && "bg-yellow-500/10 border-yellow-500 text-yellow-500",
                                statusFilter === filter.key && filter.key === "confirmed" && "bg-blue-500/10 border-blue-500 text-blue-500",
                                statusFilter === filter.key && filter.key === "picked_up" && "bg-green-500/10 border-green-500 text-green-500"
                            )}
                        >
                            {filter.label}
                            <span className="ml-2 px-1.5 py-0.5 rounded-full bg-white/10 text-xs">
                                {filter.count}
                            </span>
                        </Button>
                    ))}
                </div>

                {/* Summary Cards - Consistent with other pages */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-spare-bg-light border-white/5">
                        <CardContent className="p-5">
                            <p className="text-sm text-muted-foreground font-serif mb-2">Total Orders</p>
                            <p className="text-2xl font-bold text-white">{orders.length}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-spare-bg-light border-white/5">
                        <CardContent className="p-5">
                            <p className="text-sm text-muted-foreground font-serif mb-2">Pending</p>
                            <p className="text-2xl font-bold text-yellow-400">
                                {statusCounts.reserved + statusCounts.confirmed}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-spare-bg-light border-white/5">
                        <CardContent className="p-5">
                            <p className="text-sm text-muted-foreground font-serif mb-2">Completed</p>
                            <p className="text-2xl font-bold text-accent">{statusCounts.picked_up}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-spare-bg-light border-white/5">
                        <CardContent className="p-5">
                            <p className="text-sm text-muted-foreground font-serif mb-2">Revenue</p>
                            <p className="text-2xl font-bold text-pink">
                                {formatCurrency(orders.reduce((acc, o) => acc + o.price, 0))}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Orders List */}
                <div className="space-y-3">
                    {filteredOrders.map((order) => (
                        <Card key={order.id} className="bg-spare-bg-light border-white/5">
                            <CardContent className="py-4">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <p className="font-serif text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Customer</p>
                                            <p className="font-bold text-white text-lg leading-tight">{order.consumerName}</p>
                                            <p className="text-sm text-pink font-medium">{getCategoryLabel(order.bagCategory)}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8 text-sm">
                                        <div>
                                            <p className="font-serif text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Pickup</p>
                                            <p className="font-bold text-white">{formatTime(order.pickupTime)}</p>
                                        </div>
                                        <div>
                                            <p className="font-serif text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Code</p>
                                            <p className="font-mono font-bold text-accent">{order.pickupCode}</p>
                                        </div>
                                        <div>
                                            <p className="font-serif text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Amount</p>
                                            <p className="font-bold text-accent">{formatCurrency(order.price)}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Badge
                                            className={cn(
                                                "border-0",
                                                order.status === 'picked_up' && 'bg-green-500/20 text-green-500',
                                                order.status === 'reserved' && 'bg-yellow-500/20 text-yellow-500',
                                                order.status === 'confirmed' && 'bg-blue-500/20 text-blue-500',
                                                order.status === 'cancelled' && 'bg-red-500/20 text-red-500'
                                            )}
                                        >
                                            {order.status.replace('_', ' ')}
                                        </Badge>

                                        {order.status === 'reserved' && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="border-blue-500/50 text-blue-500 hover:bg-blue-500/10"
                                                onClick={() => handleConfirmOrder(order.id)}
                                            >
                                                Confirm
                                            </Button>
                                        )}
                                        {order.status === 'confirmed' && (
                                            <Button
                                                size="sm"
                                                className="bg-green-500 hover:bg-green-600 text-white"
                                                onClick={() => handleMarkPickedUp(order.id)}
                                            >
                                                Mark Picked Up
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                {order.feedback && (
                                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-3">
                                        <span className="text-yellow-500 font-medium">★ {order.rating}</span>
                                        <span className="text-sm text-muted-foreground italic">&quot;{order.feedback}&quot;</span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}

                    {filteredOrders.length === 0 && (
                        <Card className="bg-spare-bg-light border-white/5">
                            <CardContent className="py-12 text-center">
                                <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                <p className="text-muted-foreground">No orders found</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
}
