// Mock data for Rescue Bag App

// Categories for food filtering
export const categories = [
  {
    id: 'breakfast',
    name: 'Breakfast',
    icon: '🍳',
  },
  {
    id: 'dinner',
    name: 'Dinner',
    icon: '🍽️',
  },
  {
    id: 'supermarket',
    name: 'Supermarket',
    icon: '🛒',
  },
  {
    id: 'desserts',
    name: 'Desserts',
    icon: '🍰',
  },
];

// User's current location (mock)
export const userLocation = {
  address: '21/76, Block 21, Lodi Colony',
  city: 'New Delhi',
  coordinates: {
    latitude: 28.5921,
    longitude: 77.2190,
  },
};

// Restaurant/Merchant data
export const restaurants = [
  {
    id: 1,
    name: 'Theobroma',
    location: 'Khan Market',
    distance: 1.2,
    timeToReach: 5,
    rating: 4.4,
    reviewCount: 128,
    category: 'desserts',
    vegOnly: false,
    isAvailable: true,
    popularityScore: 95,
    dateAdded: '2025-12-01',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
    bagOptions: [
      {
        id: 101,
        type: 'Mixed Bakery',
        description: 'Assorted breads, pastries and baked goods',
        price: 199,
        originalPrice: 650,
        pickupStart: '20:00',
        pickupEnd: '21:00',
        available: 3,
      },
      {
        id: 102,
        type: 'Dessert Special',
        description: 'Cakes, brownies and sweet treats',
        price: 249,
        originalPrice: 800,
        pickupStart: '20:30',
        pickupEnd: '21:30',
        available: 2,
      },
      {
        id: 103,
        type: 'Savory Selection',
        description: 'Sandwiches, quiches and savory items',
        price: 179,
        originalPrice: 500,
        pickupStart: '19:30',
        pickupEnd: '20:30',
        available: 4,
      },
    ],
    possibleIngredients: ['Croissants', 'Brownies', 'Pastries', 'Bread', 'Muffins', 'Cookies'],
    reviews: {
      fairPortion: 4.2,
      overallHygiene: 4.6,
      freshness: 4.3,
    },
  },
  {
    id: 2,
    name: 'The French Loaf',
    location: 'Saket',
    distance: 2.5,
    timeToReach: 10,
    rating: 4.0,
    reviewCount: 89,
    category: 'desserts',
    vegOnly: true,
    isAvailable: true,
    popularityScore: 78,
    dateAdded: '2026-01-05',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    bagOptions: [
      {
        id: 201,
        type: 'Vegetarian Bakery',
        description: 'Pure veg baked goods and breads',
        price: 149,
        originalPrice: 450,
        pickupStart: '20:30',
        pickupEnd: '21:30',
        available: 5,
      },
      {
        id: 202,
        type: 'Sweet Treats',
        description: 'Veg cakes and pastries',
        price: 199,
        originalPrice: 600,
        pickupStart: '20:00',
        pickupEnd: '21:00',
        available: 3,
      },
      {
        id: 203,
        type: 'Bread Box',
        description: 'Assorted breads and rolls',
        price: 99,
        originalPrice: 300,
        pickupStart: '21:00',
        pickupEnd: '22:00',
        available: 6,
      },
    ],
    possibleIngredients: ['Baguettes', 'Croissants', 'Danish', 'Cookies', 'Bread Rolls'],
    reviews: {
      fairPortion: 4.0,
      overallHygiene: 4.2,
      freshness: 3.8,
    },
  },
  {
    id: 3,
    name: "Wenger's",
    location: 'Connaught Place',
    distance: 0.8,
    timeToReach: 3,
    rating: 3.9,
    reviewCount: 156,
    category: 'desserts',
    vegOnly: false,
    isAvailable: true,
    popularityScore: 88,
    dateAdded: '2025-11-15',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400',
    bagOptions: [
      {
        id: 301,
        type: 'Classic Selection',
        description: "Iconic Wenger's pastries and cakes",
        price: 129,
        originalPrice: 400,
        pickupStart: '21:30',
        pickupEnd: '22:30',
        available: 4,
      },
      {
        id: 302,
        type: 'Savory Box',
        description: 'Patties, sandwiches and more',
        price: 149,
        originalPrice: 450,
        pickupStart: '21:00',
        pickupEnd: '22:00',
        available: 2,
      },
      {
        id: 303,
        type: 'Mixed Surprise',
        description: "Random assortment of the day's best",
        price: 99,
        originalPrice: 350,
        pickupStart: '22:00',
        pickupEnd: '23:00',
        available: 5,
      },
    ],
    possibleIngredients: ['Patties', 'Cakes', 'Pastries', 'Sandwiches', 'Rolls', 'Biscuits'],
    reviews: {
      fairPortion: 3.8,
      overallHygiene: 4.0,
      freshness: 3.9,
    },
  },
  {
    id: 4,
    name: "L'Opera",
    location: 'Greater Kailash',
    distance: 3.1,
    timeToReach: 12,
    rating: 4.5,
    reviewCount: 203,
    category: 'desserts',
    vegOnly: false,
    isAvailable: true,
    popularityScore: 92,
    dateAdded: '2025-10-20',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
    bagOptions: [
      {
        id: 401,
        type: 'Premium Pastries',
        description: 'High-end French pastries and cakes',
        price: 299,
        originalPrice: 900,
        pickupStart: '20:00',
        pickupEnd: '21:00',
        available: 2,
      },
      {
        id: 402,
        type: 'Artisan Breads',
        description: 'Freshly baked artisan breads',
        price: 199,
        originalPrice: 550,
        pickupStart: '19:30',
        pickupEnd: '20:30',
        available: 3,
      },
      {
        id: 403,
        type: 'Café Delights',
        description: 'Quiches, sandwiches and savories',
        price: 249,
        originalPrice: 700,
        pickupStart: '20:30',
        pickupEnd: '21:30',
        available: 2,
      },
    ],
    possibleIngredients: ['Macarons', 'Eclairs', 'Tarts', 'Croissants', 'Sourdough', 'Quiche'],
    reviews: {
      fairPortion: 4.3,
      overallHygiene: 4.7,
      freshness: 4.5,
    },
  },
  {
    id: 5,
    name: 'Karachi Bakery',
    location: 'Defence Colony',
    distance: 1.8,
    timeToReach: 7,
    rating: 4.1,
    reviewCount: 312,
    category: 'desserts',
    vegOnly: true,
    isAvailable: true,
    popularityScore: 85,
    dateAdded: '2025-09-10',
    image: 'https://images.unsplash.com/photo-1558303292-0b34921f96c5?w=400',
    bagOptions: [
      {
        id: 501,
        type: 'Biscuit Box',
        description: 'Famous Karachi biscuits variety',
        price: 149,
        originalPrice: 400,
        pickupStart: '21:00',
        pickupEnd: '22:00',
        available: 8,
      },
      {
        id: 502,
        type: 'Sweet Box',
        description: 'Traditional Indian sweets',
        price: 199,
        originalPrice: 550,
        pickupStart: '20:30',
        pickupEnd: '21:30',
        available: 4,
      },
      {
        id: 503,
        type: 'Namkeen Mix',
        description: 'Savory snacks and namkeens',
        price: 99,
        originalPrice: 280,
        pickupStart: '21:30',
        pickupEnd: '22:30',
        available: 6,
      },
    ],
    possibleIngredients: ['Fruit Biscuits', 'Osmania Biscuits', 'Kaju Katli', 'Namkeen', 'Rusks'],
    reviews: {
      fairPortion: 4.4,
      overallHygiene: 4.0,
      freshness: 4.1,
    },
  },
  {
    id: 6,
    name: 'Big Chill Cakery',
    location: 'Khan Market',
    distance: 1.0,
    timeToReach: 4,
    rating: 4.3,
    reviewCount: 178,
    category: 'desserts',
    vegOnly: false,
    isAvailable: true,
    popularityScore: 90,
    dateAdded: '2026-01-10',
    image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400',
    bagOptions: [
      {
        id: 601,
        type: 'Cake Slices',
        description: 'Assorted cake slices',
        price: 249,
        originalPrice: 750,
        pickupStart: '21:30',
        pickupEnd: '22:30',
        available: 3,
      },
      {
        id: 602,
        type: 'Dessert Mix',
        description: 'Cheesecakes, brownies, and more',
        price: 299,
        originalPrice: 850,
        pickupStart: '21:00',
        pickupEnd: '22:00',
        available: 2,
      },
      {
        id: 603,
        type: 'Cookie Jar',
        description: 'Freshly baked cookies variety',
        price: 149,
        originalPrice: 400,
        pickupStart: '22:00',
        pickupEnd: '23:00',
        available: 5,
      },
    ],
    possibleIngredients: ['Cheesecake', 'Brownies', 'Cookies', 'Red Velvet', 'Tiramisu'],
    reviews: {
      fairPortion: 4.1,
      overallHygiene: 4.5,
      freshness: 4.4,
    },
  },
  {
    id: 7,
    name: 'Subway',
    location: 'Nehru Place',
    distance: 2.2,
    timeToReach: 9,
    rating: 3.8,
    reviewCount: 245,
    category: 'dinner',
    vegOnly: false,
    isAvailable: true,
    popularityScore: 75,
    dateAdded: '2026-01-12',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400',
    bagOptions: [
      {
        id: 701,
        type: 'Sub Surprise',
        description: 'Assorted subs and wraps',
        price: 149,
        originalPrice: 450,
        pickupStart: '21:30',
        pickupEnd: '22:30',
        available: 4,
      },
      {
        id: 702,
        type: 'Veggie Delight',
        description: 'Vegetarian subs only',
        price: 129,
        originalPrice: 380,
        pickupStart: '21:00',
        pickupEnd: '22:00',
        available: 5,
      },
      {
        id: 703,
        type: 'Cookie & Sides',
        description: 'Cookies and side items',
        price: 79,
        originalPrice: 200,
        pickupStart: '22:00',
        pickupEnd: '23:00',
        available: 8,
      },
    ],
    possibleIngredients: ['Subs', 'Wraps', 'Cookies', 'Salads', 'Chips'],
    reviews: {
      fairPortion: 3.9,
      overallHygiene: 4.0,
      freshness: 3.7,
    },
  },
  {
    id: 8,
    name: 'Haldiram',
    location: 'Lajpat Nagar',
    distance: 1.5,
    timeToReach: 6,
    rating: 4.2,
    reviewCount: 420,
    category: 'supermarket',
    vegOnly: true,
    isAvailable: true,
    popularityScore: 88,
    dateAdded: '2025-08-15',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
    bagOptions: [
      {
        id: 801,
        type: 'Snack Box',
        description: 'Namkeens, sweets and snacks',
        price: 149,
        originalPrice: 400,
        pickupStart: '21:00',
        pickupEnd: '22:00',
        available: 10,
      },
      {
        id: 802,
        type: 'Sweet Selection',
        description: 'Traditional Indian sweets',
        price: 199,
        originalPrice: 550,
        pickupStart: '20:30',
        pickupEnd: '21:30',
        available: 6,
      },
      {
        id: 803,
        type: 'Thali Box',
        description: 'Ready-to-eat meal items',
        price: 129,
        originalPrice: 350,
        pickupStart: '21:30',
        pickupEnd: '22:30',
        available: 4,
      },
    ],
    possibleIngredients: ['Bhujia', 'Rasgulla', 'Samosa', 'Kachori', 'Ladoo', 'Namkeen'],
    reviews: {
      fairPortion: 4.5,
      overallHygiene: 4.1,
      freshness: 4.0,
    },
  },
  {
    id: 9,
    name: 'Chaayos',
    location: 'Cyber Hub',
    distance: 4.0,
    timeToReach: 15,
    rating: 4.0,
    reviewCount: 167,
    category: 'breakfast',
    vegOnly: false,
    isAvailable: true,
    popularityScore: 72,
    dateAdded: '2026-01-15',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
    bagOptions: [
      {
        id: 901,
        type: 'Breakfast Box',
        description: 'Parathas, sandwiches and snacks',
        price: 129,
        originalPrice: 350,
        pickupStart: '10:30',
        pickupEnd: '11:30',
        available: 6,
      },
      {
        id: 902,
        type: 'Tea Time',
        description: 'Snacks perfect with chai',
        price: 99,
        originalPrice: 280,
        pickupStart: '17:30',
        pickupEnd: '18:30',
        available: 8,
      },
      {
        id: 903,
        type: 'Evening Munchies',
        description: 'Maggi, sandwiches, and more',
        price: 149,
        originalPrice: 400,
        pickupStart: '21:00',
        pickupEnd: '22:00',
        available: 4,
      },
    ],
    possibleIngredients: ['Paratha', 'Sandwich', 'Samosa', 'Maggi', 'Bun Maska'],
    reviews: {
      fairPortion: 3.8,
      overallHygiene: 4.2,
      freshness: 4.0,
    },
  },
  {
    id: 10,
    name: 'Bahadur Bhandar',
    location: 'Block 21, Lodi Colony',
    distance: 0.5,
    timeToReach: 2,
    rating: 4.6,
    reviewCount: 89,
    category: 'desserts',
    vegOnly: true,
    isAvailable: true,
    popularityScore: 65,
    dateAdded: '2026-01-16',
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400',
    bagOptions: [
      {
        id: 1001,
        type: 'Local Favorites',
        description: 'Fresh local bakery items',
        price: 79,
        originalPrice: 220,
        pickupStart: '20:30',
        pickupEnd: '21:30',
        available: 5,
      },
      {
        id: 1002,
        type: 'Sweet Surprise',
        description: 'Cakes, pastries and sweets',
        price: 99,
        originalPrice: 280,
        pickupStart: '21:00',
        pickupEnd: '22:00',
        available: 4,
      },
      {
        id: 1003,
        type: 'Bread Basket',
        description: 'Breads, buns and rolls',
        price: 59,
        originalPrice: 150,
        pickupStart: '21:30',
        pickupEnd: '22:30',
        available: 8,
      },
    ],
    possibleIngredients: ['Bread', 'Buns', 'Pastries', 'Biscuits', 'Cake Slices'],
    reviews: {
      fairPortion: 4.7,
      overallHygiene: 4.4,
      freshness: 4.6,
    },
  },
];

// Helper functions for sorting restaurants
export const getRelevantRestaurants = (restaurantList) => {
  return [...restaurantList]
    .filter(r => r.isAvailable)
    .sort((a, b) => a.distance - b.distance);
};

export const getPopularRestaurants = (restaurantList) => {
  return [...restaurantList]
    .filter(r => r.isAvailable)
    .sort((a, b) => b.popularityScore - a.popularityScore);
};

export const getNewlyAddedRestaurants = (restaurantList) => {
  return [...restaurantList]
    .filter(r => r.isAvailable)
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
};

export const getRestaurantsByCategory = (restaurantList, categoryId) => {
  if (!categoryId || categoryId === 'all') {
    return restaurantList;
  }
  return restaurantList.filter(r => r.category === categoryId);
};

// Format pickup time for display
export const formatPickupTime = (start, end) => {
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };
  return `${formatTime(start)} - ${formatTime(end)}`;
};

// Calculate savings percentage
export const calculateSavingsPercent = (original, discounted) => {
  return Math.round(((original - discounted) / original) * 100);
};

export default {
  categories,
  userLocation,
  restaurants,
  getRelevantRestaurants,
  getPopularRestaurants,
  getNewlyAddedRestaurants,
  getRestaurantsByCategory,
  formatPickupTime,
  calculateSavingsPercent,
};
