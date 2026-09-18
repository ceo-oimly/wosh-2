export type CustomerStatus = 
  | 'Pickup confirmed'
  | 'Picked up'
  | 'At WOSH'
  | 'Washing'
  | 'Checking'
  | 'Ready'
  | 'On the way'
  | 'Delivered';

export type OperationsLaundryStatus =
  | 'Picked up'
  | 'Received'
  | 'Washing'
  | 'Drying'
  | 'Ironing'
  | 'Checking'
  | 'Ready'
  | 'Out for delivery'
  | 'Delivered';

export type ProblemType =
  | 'Missing item'
  | 'Damaged item'
  | 'Laundry not clean'
  | 'Wrong item'
  | 'Late delivery'
  | 'Other';

export interface Plan {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  priceMonthly: number;
  priceQuarterly: number;
  basketsCount: string;
  pickupsPerMonth: number;
  turnaroundTime: string;
  popular?: boolean;
  features: string[];
  bestFor: string;
}

export interface LaundryPreferences {
  fragrance: string;
  starch: string;
  deliveryStyle: 'Folded in basket' | 'Shirts on hangers' | 'Everything folded';
  specialNotes?: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  pickupAddress: string;
  area: string; // e.g. Ikoyi, Victoria Island, Lekki, Lagos Island
  pickupInstructions: string;
  planId: string;
  pickupsTotal: number;
  pickupsUsed: number;
  basketStatus: 'Empty' | 'Almost full' | 'Full (Ready for pickup)';
  preferences: LaundryPreferences;
}

export interface Rider {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  assignedArea: string;
  rating: number;
}

export interface OrderProblem {
  id: string;
  orderId: string;
  customerName: string;
  problemType: ProblemType;
  description: string;
  reportedAt: string;
  status: 'Open' | 'Checking' | 'Resolved';
  resolutionNote?: string;
}

export interface LaundryOrder {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  pickupAddress: string;
  area: string;
  pickupInstructions: string;
  pickupSlot: string;
  createdAt: string;
  customerStatus: CustomerStatus;
  operationsStatus: OperationsLaundryStatus;
  expectedDelivery: string;
  itemCountEstimated: number;
  assignedRiderId?: string;
  assignedCenterId?: string;
  fragrance: string;
  starch: string;
  problemId?: string;
}

export interface LaundryCenter {
  id: string;
  name: string;
  location: string;
  activeOrdersCount: number;
  manager: string;
  phone: string;
}

export type AppRoleView = 'customer' | 'operations' | 'admin';
export type CustomerTab = 'home' | 'basket' | 'track' | 'orders' | 'plan' | 'preferences' | 'help';
