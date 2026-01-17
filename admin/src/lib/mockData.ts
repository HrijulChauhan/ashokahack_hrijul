import {
    RescueBag,
    Order
} from "./types";

// ===== Restaurant Info =====
export const restaurantInfo = {
    id: "m1",
    name: "Baker's Oven",
    email: "contact@bakersoven.in",
    phone: "+91 98765 43210",
    address: "Shop 12, Sector 14 Market",
    city: "Gurgaon",
    category: "bakery",
};

// ===== Restaurant Stats (Single Restaurant Dashboard) =====
export const mockRestaurantStats = {
    todayRevenue: 2880,
    revenueChange: 15.2,
    bagsSoldToday: 12,
    bagsChange: 8.5,
    bagsAvailable: 3,
    pendingPickups: 4,
    averageRating: 4.6,
    ratingChange: 0.2,
    wasteSaved: 24,
    wasteChange: 12.0,
    totalBagsSold: 342,
    totalRevenue: 41040,
};

// ===== Mock Rescue Bags (for this restaurant) =====
export const mockRescueBags: RescueBag[] = [
    {
        id: "b1",
        merchantId: "m1",
        merchantName: "Baker's Oven",
        category: "mixed_bakery",
        price: 120,
        originalValue: 400,
        quantity: 5,
        quantityRemaining: 2,
        pickupStart: "2026-01-17T19:00:00",
        pickupEnd: "2026-01-17T20:30:00",
        status: "available",
        createdAt: "2026-01-17T10:00:00",
        description: "Assorted pastries, croissants, and bread"
    },
    {
        id: "b2",
        merchantId: "m1",
        merchantName: "Baker's Oven",
        category: "pastries",
        price: 100,
        originalValue: 350,
        quantity: 4,
        quantityRemaining: 1,
        pickupStart: "2026-01-17T19:00:00",
        pickupEnd: "2026-01-17T20:30:00",
        status: "available",
        createdAt: "2026-01-17T10:00:00",
        description: "Fresh pastries and cakes"
    },
    {
        id: "b3",
        merchantId: "m1",
        merchantName: "Baker's Oven",
        category: "breads",
        price: 80,
        originalValue: 250,
        quantity: 6,
        quantityRemaining: 0,
        pickupStart: "2026-01-17T19:00:00",
        pickupEnd: "2026-01-17T20:30:00",
        status: "sold_out",
        createdAt: "2026-01-17T10:00:00",
        description: "Artisan breads and rolls"
    },
];

// ===== Mock Orders (for this restaurant) =====
export const mockOrders: Order[] = [
    {
        id: "o1",
        consumerId: "c1",
        consumerName: "Rohan P.",
        merchantId: "m1",
        merchantName: "Baker's Oven",
        bagId: "b1",
        bagCategory: "mixed_bakery",
        price: 120,
        status: "reserved",
        pickupTime: "2026-01-17T19:30:00",
        pickupCode: "SPARE1234",
        createdAt: "2026-01-17T15:00:00"
    },
    {
        id: "o2",
        consumerId: "c2",
        consumerName: "Priya S.",
        merchantId: "m1",
        merchantName: "Baker's Oven",
        bagId: "b2",
        bagCategory: "pastries",
        price: 100,
        status: "picked_up",
        pickupTime: "2026-01-17T19:15:00",
        pickupCode: "SPARE5678",
        createdAt: "2026-01-17T14:30:00",
        completedAt: "2026-01-17T19:20:00",
        rating: 5,
        feedback: "Delicious pastries!"
    },
    {
        id: "o3",
        consumerId: "c3",
        consumerName: "Amit K.",
        merchantId: "m1",
        merchantName: "Baker's Oven",
        bagId: "b1",
        bagCategory: "mixed_bakery",
        price: 120,
        status: "confirmed",
        pickupTime: "2026-01-17T20:00:00",
        pickupCode: "SPARE9012",
        createdAt: "2026-01-17T16:00:00"
    },
    {
        id: "o4",
        consumerId: "c4",
        consumerName: "Sneha R.",
        merchantId: "m1",
        merchantName: "Baker's Oven",
        bagId: "b3",
        bagCategory: "breads",
        price: 80,
        status: "picked_up",
        pickupTime: "2026-01-17T19:00:00",
        pickupCode: "SPARE3456",
        createdAt: "2026-01-17T13:00:00",
        completedAt: "2026-01-17T19:05:00",
        rating: 4
    },
    {
        id: "o5",
        consumerId: "c5",
        consumerName: "Vikram S.",
        merchantId: "m1",
        merchantName: "Baker's Oven",
        bagId: "b1",
        bagCategory: "mixed_bakery",
        price: 120,
        status: "reserved",
        pickupTime: "2026-01-17T20:15:00",
        pickupCode: "SPARE7890",
        createdAt: "2026-01-17T17:00:00"
    }
];

// ===== Daily Stats (Last 7 days) =====
export const mockDailyStats = [
    { date: "2026-01-11", revenue: 2450, bagsSold: 18 },
    { date: "2026-01-12", revenue: 1900, bagsSold: 15 },
    { date: "2026-01-13", revenue: 3200, bagsSold: 22 },
    { date: "2026-01-14", revenue: 2800, bagsSold: 20 },
    { date: "2026-01-15", revenue: 2100, bagsSold: 16 },
    { date: "2026-01-16", revenue: 3500, bagsSold: 25 },
    { date: "2026-01-17", revenue: 2880, bagsSold: 12 }
];

// ===== Helper Functions =====
export const getCategoryLabel = (category: string): string => {
    const labels: Record<string, string> = {
        mixed_bakery: "Mixed Bakery",
        breads: "Breads",
        pastries: "Pastries",
        snacks: "Snacks",
        mixed: "Mixed Items",
    };
    return labels[category] || category;
};

export const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
        available: "var(--color-success)",
        sold_out: "var(--color-info)",
        expired: "var(--color-gray-400)",
        cancelled: "var(--color-error)",
        reserved: "var(--color-warning)",
        confirmed: "var(--color-info)",
        picked_up: "var(--color-success)",
        no_show: "var(--color-error)"
    };
    return colors[status] || "var(--color-gray-400)";
};

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
};

export const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit"
    });
};
