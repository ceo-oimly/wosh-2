import { Plan, CustomerProfile, LaundryOrder, Rider, LaundryCenter, OrderProblem } from '../types';

export const PLANS: Plan[] = [
  {
    id: 'lite',
    name: 'WOSH Lite',
    badge: 'Starter',
    tagline: 'For lighter laundry needs',
    priceMonthly: 30000,
    priceQuarterly: 27000,
    basketsCount: '1 Medium WOSH Basket',
    pickupsPerMonth: 2,
    turnaroundTime: '48-hour return window',
    features: [
      '1 Medium WOSH Basket delivered to you',
      '2 pickups per month',
      '48-hour return window',
      'Wash, tumble dry & crisp fold',
    ],
    bestFor: 'Single individuals with small laundry'
  },
  {
    id: 'regular',
    name: 'WOSH Regular',
    badge: 'Most Popular',
    popular: true,
    tagline: 'For individuals & couples',
    priceMonthly: 55000,
    priceQuarterly: 49500,
    basketsCount: '1 Large WOSH Basket',
    pickupsPerMonth: 4,
    turnaroundTime: 'Priority 24-hour return',
    features: [
      '1 Large WOSH Bespoke Basket delivered to you',
      '4 pickups per month (Weekly pickup)',
      'Priority 24-hour return',
      'Steam pressing & crisp fold',
      'Shirts returned on hangers',
    ],
    bestFor: 'Working professionals and busy couples in Lagos'
  },
  {
    id: 'plus',
    name: 'WOSH Plus',
    badge: 'Family',
    tagline: 'For larger laundry needs',
    priceMonthly: 95000,
    priceQuarterly: 85500,
    basketsCount: '2 Large WOSH Baskets',
    pickupsPerMonth: 6,
    turnaroundTime: '24-hour return',
    features: [
      '2 Large WOSH Baskets delivered to you',
      '6 pickups per month',
      '24-hour return',
      'Includes bedsheets & bath towels',
      'Free steam press for native wear',
    ],
    bestFor: 'Growing families and shared apartments'
  },
  {
    id: 'premium',
    name: 'WOSH Premium',
    badge: 'VIP',
    tagline: 'For maximum convenience',
    priceMonthly: 160000,
    priceQuarterly: 144000,
    basketsCount: '3 Large WOSH Baskets',
    pickupsPerMonth: 8,
    turnaroundTime: 'Same-day / 12-hour priority',
    features: [
      '3 Large WOSH Baskets',
      'Unlimited weekly pickups (up to 8 / month)',
      'Same-day / 12-hour priority delivery',
      'Delicate fabric & dry-cleaning allowance included',
      'Direct customer support line via WhatsApp',
    ],
    bestFor: 'Executives & frequent native wear users'
  }
];

export const INITIAL_CUSTOMERS: CustomerProfile[] = [
  {
    id: 'cust-1',
    name: 'Amina Bello',
    phone: '0803 241 8920',
    email: 'amina.bello@gmail.com',
    pickupAddress: 'Flat 4B, Ocean View Towers, 14 Glover Road',
    area: 'Ikoyi, Lagos',
    pickupInstructions: 'Tell security at gate you are here for Apt 4B. Leave basket if I am in a meeting.',
    planId: 'regular',
    pickupsTotal: 4,
    pickupsUsed: 3, // 1 pickup left
    basketStatus: 'Almost full',
    preferences: {
      fragrance: 'Lemongrass & White Amber',
      starch: 'Medium Crisp (Traditional wear)',
      deliveryStyle: 'Shirts on hangers',
      specialNotes: 'Please hang the Senator styles on hangers and fold the casual tees.',
    }
  },
  {
    id: 'cust-2',
    name: 'Babatunde Adeleke',
    phone: '0812 774 9012',
    email: 'tunde.adeleke@yahoo.com',
    pickupAddress: 'Plot 12, Admiralty Way',
    area: 'Lekki Phase 1, Lagos',
    pickupInstructions: 'Call me on arrival or ring flat bell 3.',
    planId: 'plus',
    pickupsTotal: 6,
    pickupsUsed: 2,
    basketStatus: 'Almost full',
    preferences: {
      fragrance: 'Fresh Breeze',
      starch: 'Extra Crisp (Native wear)',
      deliveryStyle: 'Shirts on hangers',
      specialNotes: 'Heavy starch for my white agbadas please.',
    }
  },
  {
    id: 'cust-3',
    name: 'Chioma Okonkwo',
    phone: '0905 112 3344',
    email: 'chioma.o@outlook.com',
    pickupAddress: '8 Adeola Odeku Street',
    area: 'Victoria Island, Lagos',
    pickupInstructions: 'Leave with receptionist at front desk.',
    planId: 'regular',
    pickupsTotal: 4,
    pickupsUsed: 1,
    basketStatus: 'Empty',
    preferences: {
      fragrance: 'Crisp Lavender',
      starch: 'Soft (No Starch)',
      deliveryStyle: 'Folded in basket',
    }
  }
];

export const RIDERS: Rider[] = [
  {
    id: 'rider-1',
    name: 'Tunde Bakare',
    phone: '0802 334 9911',
    vehicle: 'WOSH Delivery Bike #04',
    assignedArea: 'Ikoyi & Lagos Island',
    rating: 4.9
  },
  {
    id: 'rider-2',
    name: 'Emeka Nwosu',
    phone: '0814 220 8831',
    vehicle: 'WOSH Keke Van #02',
    assignedArea: 'Victoria Island',
    rating: 4.8
  },
  {
    id: 'rider-3',
    name: 'Ibrahim Musa',
    phone: '0903 551 2299',
    vehicle: 'WOSH Eco Van #01',
    assignedArea: 'Lekki Phase 1 & 2',
    rating: 5.0
  }
];

export const LAUNDRY_CENTRES: LaundryCenter[] = [
  {
    id: 'center-1',
    name: 'Ikoyi Laundry Hub',
    location: '18 Osborne Road, Ikoyi',
    activeOrdersCount: 14,
    manager: 'Folashade Alabi',
    phone: '0802 110 4422'
  },
  {
    id: 'center-2',
    name: 'Victoria Island Center',
    location: '32 Kofo Abayomi Street, VI',
    activeOrdersCount: 22,
    manager: 'Oladipo Sanusi',
    phone: '0818 900 3311'
  },
  {
    id: 'center-3',
    name: 'Lekki Washing Plant',
    location: 'Plot 7, Freedom Way, Lekki Phase 1',
    activeOrdersCount: 31,
    manager: 'Ngozi Eze',
    phone: '0806 777 5544'
  }
];

export const INITIAL_ORDERS: LaundryOrder[] = [
  {
    id: 'WSH-1082',
    customerId: 'cust-1',
    customerName: 'Amina Bello',
    customerPhone: '0803 241 8920',
    pickupAddress: 'Flat 4B, Ocean View Towers, 14 Glover Road',
    area: 'Ikoyi, Lagos',
    pickupInstructions: 'Tell security at gate you are here for Apt 4B. Leave basket if I am in a meeting.',
    pickupSlot: 'Today, 10:00 AM - 12:00 PM',
    createdAt: 'Today, 10:15 AM',
    customerStatus: 'Washing',
    operationsStatus: 'Washing',
    expectedDelivery: 'Tomorrow by 6 PM',
    itemCountEstimated: 24,
    assignedRiderId: 'rider-1',
    assignedCenterId: 'center-1',
    fragrance: 'Lemongrass & White Amber',
    starch: 'Medium Crisp (Traditional wear)',
  },
  {
    id: 'WSH-1078',
    customerId: 'cust-2',
    customerName: 'Babatunde Adeleke',
    customerPhone: '0812 774 9012',
    pickupAddress: 'Plot 12, Admiralty Way',
    area: 'Lekki Phase 1, Lagos',
    pickupInstructions: 'Call me on arrival or ring flat bell 3.',
    pickupSlot: 'Yesterday, 2:00 PM - 4:00 PM',
    createdAt: 'Yesterday, 2:30 PM',
    customerStatus: 'On the way',
    operationsStatus: 'Out for delivery',
    expectedDelivery: 'Today by 5 PM',
    itemCountEstimated: 35,
    assignedRiderId: 'rider-3',
    assignedCenterId: 'center-3',
    fragrance: 'Fresh Breeze',
    starch: 'Extra Crisp (Native wear)',
  },
  {
    id: 'WSH-1065',
    customerId: 'cust-1',
    customerName: 'Amina Bello',
    customerPhone: '0803 241 8920',
    pickupAddress: 'Flat 4B, Ocean View Towers, 14 Glover Road',
    area: 'Ikoyi, Lagos',
    pickupInstructions: 'Gate security confirmed.',
    pickupSlot: 'Last Friday, 9:00 AM - 11:00 AM',
    createdAt: 'Sep 12, 2026',
    customerStatus: 'Delivered',
    operationsStatus: 'Delivered',
    expectedDelivery: 'Delivered Sep 13, 2026',
    itemCountEstimated: 21,
    assignedRiderId: 'rider-1',
    assignedCenterId: 'center-1',
    fragrance: 'Lemongrass & White Amber',
    starch: 'Medium Crisp (Traditional wear)',
  },
  {
    id: 'WSH-1051',
    customerId: 'cust-1',
    customerName: 'Amina Bello',
    customerPhone: '0803 241 8920',
    pickupAddress: 'Flat 4B, Ocean View Towers, 14 Glover Road',
    area: 'Ikoyi, Lagos',
    pickupInstructions: 'Gate security confirmed.',
    pickupSlot: 'Sep 5, 2026, 11:00 AM',
    createdAt: 'Sep 5, 2026',
    customerStatus: 'Delivered',
    operationsStatus: 'Delivered',
    expectedDelivery: 'Delivered Sep 6, 2026',
    itemCountEstimated: 19,
    assignedRiderId: 'rider-1',
    assignedCenterId: 'center-1',
    fragrance: 'Lemongrass & White Amber',
    starch: 'Medium Crisp (Traditional wear)',
  }
];

export const INITIAL_PROBLEMS: OrderProblem[] = [
  {
    id: 'prob-1',
    orderId: 'WSH-1070',
    customerName: 'Kunle Martins',
    problemType: 'Late delivery',
    description: 'Rider held in Lekki toll traffic due to rain. Delivery pushed by 1 hour.',
    reportedAt: 'Today, 1:20 PM',
    status: 'Resolved',
    resolutionNote: 'Customer called and informed. Arrived safely at 2:30 PM.'
  },
  {
    id: 'prob-2',
    orderId: 'WSH-1079',
    customerName: 'Yetunde Johnson',
    problemType: 'Laundry not clean',
    description: 'Small palm oil stain on white lace cuff was still visible after standard wash.',
    reportedAt: 'Yesterday, 4:45 PM',
    status: 'Checking',
    resolutionNote: 'Sent back for gentle spot-treat stain removal.'
  }
];
