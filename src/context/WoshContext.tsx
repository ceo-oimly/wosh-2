import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CustomerProfile,
  LaundryOrder,
  OrderProblem,
  CustomerStatus,
  OperationsLaundryStatus,
  AppRoleView,
  CustomerTab,
  ProblemType,
} from '../types';
import {
  INITIAL_CUSTOMERS,
  INITIAL_ORDERS,
  INITIAL_PROBLEMS,
  PLANS,
  RIDERS,
  LAUNDRY_CENTRES,
} from '../data/mockData';

interface WoshContextType {
  role: AppRoleView;
  setRole: (role: AppRoleView) => void;
  activeTab: CustomerTab;
  setActiveTab: (tab: CustomerTab) => void;
  currentUser: CustomerProfile;
  switchUser: (userId: string) => void;
  allCustomers: CustomerProfile[];
  orders: LaundryOrder[];
  problems: OrderProblem[];
  requestPickupModalOpen: boolean;
  setRequestPickupModalOpen: (open: boolean) => void;
  paymentModalPlanId: string | null;
  setPaymentModalPlanId: (planId: string | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  // Actions
  requestPickup: (slot: string, address: string, instructions: string) => void;
  updateBasketStatus: (status: 'Empty' | 'Almost full' | 'Full (Ready for pickup)') => void;
  updateOperationsStatus: (orderId: string, newStatus: OperationsLaundryStatus) => void;
  updatePreferences: (prefs: Partial<CustomerProfile['preferences']>) => void;
  reportProblem: (orderId: string, problemType: ProblemType, description: string) => void;
  resolveProblem: (problemId: string, resolutionNote: string) => void;
  changePlan: (newPlanId: string) => void;
  currentActiveOrder: LaundryOrder | undefined;
}

const WoshContext = createContext<WoshContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'wosh_lagos_state_v1';

export const WoshProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<AppRoleView>('customer');
  const [activeTab, setActiveTab] = useState<CustomerTab>('home');
  const [customers, setCustomers] = useState<CustomerProfile[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });
  const [currentUserId, setCurrentUserId] = useState<string>('cust-1');

  const [orders, setOrders] = useState<LaundryOrder[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [problems, setProblems] = useState<OrderProblem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_problems');
    return saved ? JSON.parse(saved) : INITIAL_PROBLEMS;
  });

  const [requestPickupModalOpen, setRequestPickupModalOpen] = useState(false);
  const [paymentModalPlanId, setPaymentModalPlanId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY + '_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY + '_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY + '_problems', JSON.stringify(problems));
  }, [problems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 4000);
  };

  const currentUser = customers.find(c => c.id === currentUserId) || customers[0];

  const switchUser = (userId: string) => {
    setCurrentUserId(userId);
    showToast(`Switched account to ${customers.find(c => c.id === userId)?.name}`);
  };

  // Find the active ongoing order for the current user (not yet delivered)
  const currentActiveOrder = orders.find(
    o => o.customerId === currentUser.id && o.customerStatus !== 'Delivered'
  );

  const mapOpStatusToCustomerStatus = (opStatus: OperationsLaundryStatus): CustomerStatus => {
    switch (opStatus) {
      case 'Picked up':
        return 'Picked up';
      case 'Received':
        return 'At WOSH';
      case 'Washing':
        return 'Washing';
      case 'Drying':
      case 'Ironing':
      case 'Checking':
        return 'Checking';
      case 'Ready':
        return 'Ready';
      case 'Out for delivery':
        return 'On the way';
      case 'Delivered':
        return 'Delivered';
      default:
        return 'Pickup confirmed';
    }
  };

  const requestPickup = (slot: string, address: string, instructions: string) => {
    // Generate new order
    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: LaundryOrder = {
      id: `WSH-${orderNum}`,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      pickupAddress: address || currentUser.pickupAddress,
      area: currentUser.area,
      pickupInstructions: instructions || currentUser.pickupInstructions,
      pickupSlot: slot,
      createdAt: 'Just now',
      customerStatus: 'Pickup confirmed',
      operationsStatus: 'Picked up', // ready for rider pickup
      expectedDelivery: 'Tomorrow by 6 PM',
      itemCountEstimated: 20,
      assignedRiderId: RIDERS[0].id,
      assignedCenterId: LAUNDRY_CENTRES[0].id,
      fragrance: currentUser.preferences.fragrance,
      starch: currentUser.preferences.starch,
    };

    setOrders(prev => [newOrder, ...prev]);

    // Update customer's basket and pickups used
    setCustomers(prev =>
      prev.map(c => {
        if (c.id === currentUser.id) {
          const used = Math.min(c.pickupsTotal, c.pickupsUsed + 1);
          return {
            ...c,
            pickupsUsed: used,
            basketStatus: 'Empty',
            pickupAddress: address || c.pickupAddress,
            pickupInstructions: instructions || c.pickupInstructions,
          };
        }
        return c;
      })
    );

    setRequestPickupModalOpen(false);
    setActiveTab('track');
    showToast('Pickup confirmed! Rider Tunde will arrive during your chosen time.');
  };

  const updateBasketStatus = (status: 'Empty' | 'Almost full' | 'Full (Ready for pickup)') => {
    setCustomers(prev =>
      prev.map(c => (c.id === currentUser.id ? { ...c, basketStatus: status } : c))
    );
    showToast(`Basket status updated: ${status}`);
  };

  const updateOperationsStatus = (orderId: string, newStatus: OperationsLaundryStatus) => {
    const custStatus = mapOpStatusToCustomerStatus(newStatus);
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            operationsStatus: newStatus,
            customerStatus: custStatus,
            ...(newStatus === 'Delivered' ? { expectedDelivery: 'Delivered today' } : {})
          };
        }
        return o;
      })
    );
    showToast(`Order ${orderId} updated to: ${newStatus}`);
  };

  const updatePreferences = (prefs: Partial<CustomerProfile['preferences']>) => {
    setCustomers(prev =>
      prev.map(c => {
        if (c.id === currentUser.id) {
          return {
            ...c,
            preferences: {
              ...c.preferences,
              ...prefs,
            },
          };
        }
        return c;
      })
    );
    showToast('Laundry preferences saved successfully.');
  };

  const reportProblem = (orderId: string, problemType: ProblemType, description: string) => {
    const probId = `prob-${Date.now().toString().slice(-4)}`;
    const newProb: OrderProblem = {
      id: probId,
      orderId,
      customerName: currentUser.name,
      problemType,
      description,
      reportedAt: 'Just now',
      status: 'Open',
    };

    setProblems(prev => [newProb, ...prev]);
    showToast(`Problem reported. Our Lagos team is looking into this immediately.`);
  };

  const resolveProblem = (problemId: string, resolutionNote: string) => {
    setProblems(prev =>
      prev.map(p => {
        if (p.id === problemId) {
          return {
            ...p,
            status: 'Resolved',
            resolutionNote,
          };
        }
        return p;
      })
    );
    showToast('Problem marked as resolved.');
  };

  const changePlan = (newPlanId: string) => {
    const plan = PLANS.find(p => p.id === newPlanId);
    if (!plan) return;

    setCustomers(prev =>
      prev.map(c => {
        if (c.id === currentUser.id) {
          return {
            ...c,
            planId: newPlanId,
            pickupsTotal: plan.pickupsPerMonth,
            pickupsUsed: 0,
          };
        }
        return c;
      })
    );
    setPaymentModalPlanId(null);
    showToast(`Subscribed to ${plan.name}! Your clean WOSH basket is on its way.`);
  };

  return (
    <WoshContext.Provider
      value={{
        role,
        setRole,
        activeTab,
        setActiveTab,
        currentUser,
        switchUser,
        allCustomers: customers,
        orders,
        problems,
        requestPickupModalOpen,
        setRequestPickupModalOpen,
        paymentModalPlanId,
        setPaymentModalPlanId,
        toastMessage,
        showToast,
        requestPickup,
        updateBasketStatus,
        updateOperationsStatus,
        updatePreferences,
        reportProblem,
        resolveProblem,
        changePlan,
        currentActiveOrder,
      }}
    >
      {children}
    </WoshContext.Provider>
  );
};

export const useWosh = () => {
  const context = useContext(WoshContext);
  if (!context) {
    throw new Error('useWosh must be used within a WoshProvider');
  }
  return context;
};
