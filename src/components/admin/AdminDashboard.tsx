import React, { useState } from 'react';
import { useWosh } from '../../context/WoshContext';
import { PLANS, RIDERS, LAUNDRY_CENTRES } from '../../data/mockData';
import {
  Users,
  CreditCard,
  Package,
  Bike,
  Building2,
  AlertCircle,
  FileBarChart,
  DollarSign,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { allCustomers, orders, problems } = useWosh();

  type AdminTab =
    | 'customers'
    | 'plans'
    | 'subscriptions'
    | 'payments'
    | 'orders'
    | 'riders'
    | 'centres'
    | 'problems'
    | 'reports';

  const [activeTab, setActiveTab] = useState<AdminTab>('reports');

  // Key metrics calculation
  const totalSubscribers = allCustomers.length;
  const totalMRR = allCustomers.reduce((acc, c) => {
    const plan = PLANS.find(p => p.id === c.planId);
    return acc + (plan ? plan.priceMonthly : 55000);
  }, 0);

  const completedOrders = orders.filter(o => o.customerStatus === 'Delivered').length;
  const activeOrders = orders.filter(o => o.customerStatus !== 'Delivered').length;

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-16 px-4 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E6E1D8] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#005235] font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#008751] animate-pulse" />
            WOSH Lagos Management
          </div>
          <h1 className="text-2xl font-bold font-display text-[#1A1C19]">
            Admin Dashboard
          </h1>
          <p className="text-xs text-[#5A635B]">
            High-level overview of subscriptions, payments in Naira, Lagos riders, and laundry centres.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#EBF6EE] px-3 py-1.5 rounded-xl border border-[#CDECD7] text-xs font-semibold text-[#005235]">
          <MapPin className="w-3.5 h-3.5" />
          <span>Active Hubs: Ikoyi • VI • Lekki</span>
        </div>
      </div>

      {/* Admin Top Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold border-b border-[#E6E1D8]">
        {[
          { id: 'reports', label: 'Reports & Numbers', icon: FileBarChart },
          { id: 'customers', label: 'Customers', icon: Users },
          { id: 'plans', label: 'Plans', icon: Package },
          { id: 'subscriptions', label: 'Subscriptions', icon: TrendingUp },
          { id: 'payments', label: 'Payments', icon: CreditCard },
          { id: 'orders', label: 'Orders', icon: Package },
          { id: 'riders', label: 'Riders', icon: Bike },
          { id: 'centres', label: 'Laundry Centres', icon: Building2 },
          { id: 'problems', label: 'Problems', icon: AlertCircle },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-[#004D31] text-white shadow-xs'
                  : 'text-[#5A635B] hover:bg-[#FAF7F2] hover:text-[#1A1C19]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. REPORTS / NUMBERS */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-[#E6E1D8] shadow-xs">
              <p className="text-xs text-[#616962] font-semibold">Monthly Subscriptions</p>
              <p className="text-2xl font-bold font-display text-[#1A1C19] mt-1">
                ₦{totalMRR.toLocaleString()}
              </p>
              <span className="text-[11px] text-[#005235] font-semibold">Recurring in Lagos</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E6E1D8] shadow-xs">
              <p className="text-xs text-[#616962] font-semibold">Subscribers</p>
              <p className="text-2xl font-bold font-display text-[#004D31] mt-1">
                {totalSubscribers} active
              </p>
              <span className="text-[11px] text-[#616962]">0 cancellations this month</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E6E1D8] shadow-xs">
              <p className="text-xs text-[#616962] font-semibold">Laundry Deliveries</p>
              <p className="text-2xl font-bold font-display text-[#1A1C19] mt-1">
                {orders.length}
              </p>
              <span className="text-[11px] text-[#005235] font-semibold">99.4% on-time delivery</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E6E1D8] shadow-xs">
              <p className="text-xs text-[#616962] font-semibold">Active Riders</p>
              <p className="text-2xl font-bold font-display text-[#1A1C19] mt-1">
                {RIDERS.length}
              </p>
              <span className="text-[11px] text-[#616962]">Bikes, Kekes & Vans</span>
            </div>
          </div>

          {/* Lagos Area Breakdown */}
          <div className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs">
            <h3 className="text-sm font-bold text-[#1A1C19] mb-3">
              Performance by Lagos Neighborhood
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E6E1D8]">
                <p className="font-bold text-sm text-[#1A1C19]">Ikoyi</p>
                <p className="text-[#5A635B] mt-1">Ocean View, Glover, Osborne</p>
                <p className="text-sm font-bold text-[#004D31] mt-2">₦420,000 / mo</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E6E1D8]">
                <p className="font-bold text-sm text-[#1A1C19]">Victoria Island</p>
                <p className="text-[#5A635B] mt-1">Adeola Odeku, Kofo Abayomi</p>
                <p className="text-sm font-bold text-[#004D31] mt-2">₦310,000 / mo</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E6E1D8]">
                <p className="font-bold text-sm text-[#1A1C19]">Lekki Phase 1</p>
                <p className="text-[#5A635B] mt-1">Admiralty, Freedom Way</p>
                <p className="text-sm font-bold text-[#004D31] mt-2">₦585,000 / mo</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E6E1D8]">
                <p className="font-bold text-sm text-[#1A1C19]">Lagos Island</p>
                <p className="text-[#5A635B] mt-1">Marina, Broad St</p>
                <p className="text-sm font-bold text-[#004D31] mt-2">₦180,000 / mo</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. CUSTOMERS */}
      {activeTab === 'customers' && (
        <div className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs space-y-3">
          <h2 className="text-base font-bold text-[#1A1C19]">Customers List</h2>
          <div className="divide-y divide-[#F0ECE1]">
            {allCustomers.map(cust => (
              <div key={cust.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <p className="font-bold text-sm text-[#1A1C19]">{cust.name}</p>
                  <p className="text-[#5A635B]">{cust.phone} • {cust.email}</p>
                  <p className="text-[#1A1C19] mt-0.5">{cust.pickupAddress}, {cust.area}</p>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E8F7EE] text-[#005235] font-bold">
                    Plan: {cust.planId.toUpperCase()}
                  </span>
                  <p className="text-[#616962] mt-1">Pickups: {cust.pickupsUsed} / {cust.pickupsTotal} used</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. PLANS */}
      {activeTab === 'plans' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PLANS.map(plan => (
            <div key={plan.id} className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6D776E]">{plan.badge}</span>
                <span className="text-xs font-bold text-[#004D31]">₦{plan.priceMonthly.toLocaleString()} / mo</span>
              </div>
              <h3 className="text-lg font-bold text-[#1A1C19] font-display">{plan.name}</h3>
              <p className="text-xs text-[#5A635B]">{plan.tagline}</p>
              <div className="p-3 rounded-xl bg-[#FAF7F2] text-xs space-y-1 mt-2">
                <p>• {plan.basketsCount}</p>
                <p>• {plan.pickupsPerMonth} pickups per month</p>
                <p>• {plan.turnaroundTime}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. SUBSCRIPTIONS */}
      {activeTab === 'subscriptions' && (
        <div className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs space-y-3">
          <h2 className="text-base font-bold text-[#1A1C19]">Active Subscriptions</h2>
          <div className="space-y-3">
            {allCustomers.map(cust => {
              const plan = PLANS.find(p => p.id === cust.planId) || PLANS[1];
              return (
                <div key={cust.id} className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E6E1D8] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <strong className="text-sm text-[#1A1C19]">{cust.name}</strong>
                    <p className="text-[#5A635B]">{plan.name} • ₦{plan.priceMonthly.toLocaleString()} / mo</p>
                    <p className="text-[#616962]">Location: {cust.area}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded bg-[#E8F7EE] text-[#005235] font-bold">Active</span>
                    <p className="text-[#616962] mt-1">Renews next month</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. PAYMENTS */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#1A1C19]">Recent Payments (₦)</h2>
            <span className="text-xs text-[#005235] font-bold">All settled via Nigerian Gateway</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E6E1D8] flex items-center justify-between">
              <div>
                <strong className="text-[#1A1C19]">Amina Bello</strong>
                <p className="text-[#616962]">WOSH Regular Monthly Subscription</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-[#1A1C19]">₦55,000</span>
                <p className="text-[#004D31] font-semibold">Success (Card)</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E6E1D8] flex items-center justify-between">
              <div>
                <strong className="text-[#1A1C19]">Babatunde Adeleke</strong>
                <p className="text-[#616962]">WOSH Plus Monthly Subscription</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-[#1A1C19]">₦95,000</span>
                <p className="text-[#004D31] font-semibold">Success (Transfer)</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E6E1D8] flex items-center justify-between">
              <div>
                <strong className="text-[#1A1C19]">Chioma Okonkwo</strong>
                <p className="text-[#616962]">WOSH Regular Quarterly Subscription</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-[#1A1C19]">₦148,500</span>
                <p className="text-[#004D31] font-semibold">Success (Card)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. ORDERS */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs space-y-3">
          <h2 className="text-base font-bold text-[#1A1C19]">All Orders</h2>
          <div className="space-y-2 text-xs">
            {orders.map(order => (
              <div key={order.id} className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E6E1D8] flex items-center justify-between">
                <div>
                  <strong className="text-[#1A1C19]">{order.id} - {order.customerName}</strong>
                  <p className="text-[#5A635B]">{order.pickupAddress}, {order.area}</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded font-semibold bg-white border border-[#E6E1D8]">
                    {order.customerStatus}
                  </span>
                  <p className="text-[#616962] mt-0.5">~{order.itemCountEstimated} items</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. RIDERS */}
      {activeTab === 'riders' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {RIDERS.map(rider => (
            <div key={rider.id} className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#E8F7EE] text-[#004D31] flex items-center justify-center font-bold">
                  {rider.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-[#1A1C19] text-sm">{rider.name}</p>
                  <p className="text-[#5A635B]">{rider.phone}</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF7F2] space-y-1">
                <p>Vehicle: <strong>{rider.vehicle}</strong></p>
                <p>Area: <strong>{rider.assignedArea}</strong></p>
                <p>Customer Rating: <strong>⭐ {rider.rating} / 5.0</strong></p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 8. CENTRES */}
      {activeTab === 'centres' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {LAUNDRY_CENTRES.map(c => (
            <div key={c.id} className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs space-y-2 text-xs">
              <h3 className="font-bold text-[#1A1C19] text-sm">{c.name}</h3>
              <p className="text-[#5A635B]">{c.location}</p>
              <div className="p-3 rounded-xl bg-[#FAF7F2] space-y-1">
                <p>Center Manager: <strong>{c.manager}</strong></p>
                <p>Contact: <strong>{c.phone}</strong></p>
                <p>Capacity: <strong>{c.activeOrdersCount} active baskets</strong></p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 9. PROBLEMS */}
      {activeTab === 'problems' && (
        <div className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs space-y-3">
          <h2 className="text-base font-bold text-[#1A1C19]">Problems Log</h2>
          <div className="space-y-3 text-xs">
            {problems.map(p => (
              <div key={p.id} className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E6E1D8] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#C2410C]">{p.problemType}</span>
                  <span className="px-2 py-0.5 rounded bg-white border border-[#E6E1D8] font-bold">{p.status}</span>
                </div>
                <p className="text-[#1A1C19]">Order: <strong>{p.orderId}</strong> • Customer: {p.customerName}</p>
                <p className="text-[#5A635B]">"{p.description}"</p>
                {p.resolutionNote && (
                  <p className="text-[#005235] font-semibold">Resolution: {p.resolutionNote}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
