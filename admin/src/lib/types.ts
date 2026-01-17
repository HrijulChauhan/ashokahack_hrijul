// ===== Spare Restaurant Dashboard - Type Definitions =====

// Rescue Bag Types
export interface RescueBag {
    id: string;
    merchantId: string;
    merchantName: string;
    category: BagCategory;
    price: number;
    originalValue: number;
    quantity: number;
    quantityRemaining: number;
    pickupStart: string;
    pickupEnd: string;
    status: BagStatus;
    createdAt: string;
    description?: string;
}

export type BagCategory =
    | "mixed_bakery"
    | "breads"
    | "pastries"
    | "snacks"
    | "mixed";

export type BagStatus = "available" | "sold_out" | "expired" | "cancelled";

// Order Types
export interface Order {
    id: string;
    consumerId: string;
    consumerName: string;
    merchantId: string;
    merchantName: string;
    bagId: string;
    bagCategory: BagCategory;
    price: number;
    status: OrderStatus;
    pickupTime: string;
    pickupCode: string;
    createdAt: string;
    completedAt?: string;
    rating?: number;
    feedback?: string;
}

export type OrderStatus =
    | "reserved"
    | "confirmed"
    | "picked_up"
    | "cancelled"
    | "no_show"
    | "expired";

// Restaurant Stats
export interface RestaurantStats {
    todayRevenue: number;
    revenueChange: number;
    bagsSoldToday: number;
    bagsChange: number;
    bagsAvailable: number;
    pendingPickups: number;
    averageRating: number;
    ratingChange: number;
    wasteSaved: number;
    wasteChange: number;
    totalBagsSold: number;
    totalRevenue: number;
}

// Daily Stats
export interface DailyStats {
    date: string;
    revenue: number;
    bagsSold: number;
}
