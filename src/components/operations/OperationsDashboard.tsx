import React, { useState } from 'react';
import { useWosh } from '../../context/WoshContext';
import { OperationsLaundryStatus, ProblemType } from '../../types';
import { LAUNDRY_CENTRES, RIDERS } from '../../data/mockData';
import {
  Layers,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  Users,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Phone,
  RefreshCw
} from 'lucide-react';

export const OperationsDashboard: React.FC = () => {
  const {
    orders,
    problems,
    allCustomers,
    updateOperationsStatus,
    resolveProblem,
    showToast
  } = useWosh();

  type OpTab = 'overview' | 'pickups' | 'laundry' | 'deliveries' | 'customers' | 'problems';
  const [activeTab, setActiveTab] = useState<OpTab>('overview');
  const [selectedCenter, setSelectedCenter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Status progression list
  const opStatuses: OperationsLaundryStatus[] = [
    'Picked up',
    'Received',
    'Washing',
    'Drying',
    'Ironing',
    'Checking',
    'Ready',
    'Out for delivery',
    'Delivered'
  ];

  // Counts
  const activeLaundryOrders = orders.filter(o => o.operationsStatus !== 'Delivered');
  const deliveredOrders = orders.filter(o => o.operationsStatus === 'Delivered');
  const openProblems = problems.filter(p => p.status !== 'Resolved');

  const filteredOrders = orders.filter(o => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.area.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCenter =
      selectedCenter === 'all' || o.assignedCenterId === selectedCenter;
    return matchesSearch && matchesCenter;
  });

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-16 px-4 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E6E1D8] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#005235] font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#008751] animate-pulse" />
            WOSH Operations • Lagos Hubs
          </div>
          <h1 className="text-2xl font-bold font-display text-[#1A1C19]">
            Laundry Operations
          </h1>
          <p className="text-xs text-[#5A635B]">
            Manage pickups, washing, ironing, deliveries, and customer orders across Lagos.
          </p>
        </div>

        {/* Center Selector Filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-[#5A635B]">Center:</label>
          <select
            value={selectedCenter}
            onChange={e => setSelectedCenter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-[#D5CEC2] bg-white text-xs font-semibold text-[#1A1C19] outline-none"
          >
            <option value="all">All Lagos Centers</option>
            {LAUNDRY_CENTRES.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold border-b border-[#E6E1D8]">
        {[
          { id: 'overview', label: 'Overview', count: undefined },
          { id: 'pickups', label: 'Pickups', count: activeLaundryOrders.filter(o => o.operationsStatus === 'Picked up').length },
          { id: 'laundry', label: 'Laundry', count: activeLaundryOrders.length },
          { id: 'deliveries', label: 'Deliveries', count: activeLaundryOrders.filter(o => o.operationsStatus === 'Out for delivery').length },
          { id: 'customers', label: 'Customers', count: allCustomers.length },
          { id: 'problems', label: 'Problems', count: openProblems.length },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as OpTab)}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === tab.id
                ? 'bg-[#004D31] text-white shadow-xs'
                : 'text-[#5A635B] hover:bg-[#FAF7F2] hover:text-[#1A1C19]'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && tab.count > 0 && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeTab === tab.id
                    ? 'bg-[#8CD6AE] text-[#004D31]'
                    : 'bg-[#EBE6DC] text-[#1A1C19]'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-[#E6E1D8] shadow-xs">
              <p className="text-xs text-[#616962] font-semibold">Active Laundry</p>
              <p className="text-2xl font-bold font-display text-[#1A1C19] mt-1">
                {activeLaundryOrders.length}
              </p>
              <span className="text-[11px] text-[#005235] font-semibold">In centers & on road</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E6E1D8] shadow-xs">
              <p className="text-xs text-[#616962] font-semibold">Ready for Delivery</p>
              <p className="text-2xl font-bold font-display text-[#004D31] mt-1">
                {orders.filter(o => o.operationsStatus === 'Ready' || o.operationsStatus === 'Out for delivery').length}
              </p>
              <span className="text-[11px] text-[#616962]">Packed in clean baskets</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E6E1D8] shadow-xs">
              <p className="text-xs text-[#616962] font-semibold">Delivered Today</p>
              <p className="text-2xl font-bold font-display text-[#1A1C19] mt-1">
                {deliveredOrders.length}
              </p>
              <span className="text-[11px] text-[#005235] font-semibold">100% on-time</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E6E1D8] shadow-xs">
              <p className="text-xs text-[#616962] font-semibold">Open Problems</p>
              <p className={`text-2xl font-bold font-display mt-1 ${openProblems.length > 0 ? 'text-[#C2410C]' : 'text-[#005235]'}`}>
                {openProblems.length}
              </p>
              <span className="text-[11px] text-[#616962]">Needing attention</span>
            </div>
          </div>

          {/* Quick Action Laundry Queue */}
          <div className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#1A1C19] font-display">
                Current Laundry Queue (Tap to change status)
              </h2>
              <span className="text-xs text-[#5A635B]">
                Updates customer app immediately
              </span>
            </div>

            <div className="space-y-3">
              {activeLaundryOrders.map(order => (
                <div
                  key={order.id}
                  className="p-4 rounded-xl border border-[#F0ECE1] bg-[#FAF7F2] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#1A1C19]">{order.id}</span>
                      <span className="text-xs font-semibold text-[#005235]">• {order.customerName}</span>
                      <span className="text-xs text-[#616962]">({order.area})</span>
                    </div>
                    <p className="text-xs text-[#5A635B] mt-0.5">
                      ~{order.itemCountEstimated} items • Prefs: {order.fragrance} • {order.starch}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-[#1A1C19] bg-white px-2.5 py-1 rounded-lg border border-[#E6E1D8]">
                      Status: {order.operationsStatus}
                    </span>

                    <select
                      value={order.operationsStatus}
                      onChange={e => updateOperationsStatus(order.id, e.target.value as OperationsLaundryStatus)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#004D31] text-white text-xs font-bold outline-none cursor-pointer"
                    >
                      {opStatuses.map(st => (
                        <option key={st} value={st}>
                          Move to: {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lagos Laundry Centers Summary */}
          <div className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs">
            <h3 className="text-sm font-bold text-[#1A1C19] mb-3">
              Lagos Laundry Centers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {LAUNDRY_CENTRES.map(c => (
                <div key={c.id} className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E6E1D8] text-xs">
                  <p className="font-bold text-[#1A1C19]">{c.name}</p>
                  <p className="text-[#5A635B]">{c.location}</p>
                  <div className="mt-2 pt-2 border-t border-[#E6E1D8] flex items-center justify-between">
                    <span className="text-[#616962]">Manager: {c.manager}</span>
                    <span className="font-bold text-[#004D31]">{c.activeOrdersCount} in wash</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. PICKUPS TAB */}
      {activeTab === 'pickups' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs">
            <h2 className="text-base font-bold text-[#1A1C19] mb-1">
              Scheduled Pickups in Lagos
            </h2>
            <p className="text-xs text-[#5A635B] mb-4">
              Riders going out to collect baskets from customer addresses.
            </p>

            <div className="space-y-3">
              {filteredOrders
                .filter(o => o.operationsStatus === 'Picked up' || o.customerStatus === 'Pickup confirmed')
                .map(order => (
                  <div key={order.id} className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E6E1D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#1A1C19]">{order.id}</span>
                        <span className="text-xs text-[#004D31] font-bold">• {order.customerName}</span>
                      </div>
                      <p className="text-xs text-[#1A1C19] font-medium mt-0.5">{order.pickupAddress}, {order.area}</p>
                      <p className="text-[11px] text-[#616962]">Slot: {order.pickupSlot}</p>
                      {order.pickupInstructions && (
                        <p className="text-[11px] text-[#8C6D1F] bg-[#FFFBEB] p-1.5 rounded mt-1">
                          Note: "{order.pickupInstructions}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateOperationsStatus(order.id, 'Received')}
                        className="py-1.5 px-3 rounded-lg bg-[#004D31] text-white text-xs font-bold hover:bg-[#003E26]"
                      >
                        Mark as Received at Center
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. LAUNDRY TAB */}
      {activeTab === 'laundry' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs">
            <h2 className="text-base font-bold text-[#1A1C19] mb-1">
              Laundry Processing Board
            </h2>
            <p className="text-xs text-[#5A635B] mb-4">
              Move orders step-by-step through washing, drying, ironing, and checking.
            </p>

            <div className="space-y-3">
              {filteredOrders.map(order => (
                <div key={order.id} className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E6E1D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#1A1C19]">{order.id}</span>
                      <span className="text-xs text-[#004D31] font-bold">{order.customerName}</span>
                      <span className="text-xs text-[#616962]">({order.area})</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#5A635B] mt-1">
                      <span>Fragrance: <strong>{order.fragrance}</strong></span>
                      <span>•</span>
                      <span>Starch: <strong>{order.starch}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-white border border-[#E6E1D8]">
                      {order.operationsStatus}
                    </span>
                    <select
                      value={order.operationsStatus}
                      onChange={e => updateOperationsStatus(order.id, e.target.value as OperationsLaundryStatus)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#004D31] text-white text-xs font-bold outline-none"
                    >
                      {opStatuses.map(st => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. DELIVERIES TAB */}
      {activeTab === 'deliveries' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs">
            <h2 className="text-base font-bold text-[#1A1C19] mb-1">
              Deliveries
            </h2>
            <p className="text-xs text-[#5A635B] mb-4">
              Clean laundry returning to customers across Ikoyi, VI, and Lekki.
            </p>

            <div className="space-y-3">
              {filteredOrders
                .filter(o => o.operationsStatus === 'Ready' || o.operationsStatus === 'Out for delivery' || o.operationsStatus === 'Delivered')
                .map(order => (
                  <div key={order.id} className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E6E1D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#1A1C19]">{order.id}</span>
                        <span className="text-xs font-bold text-[#004D31]">{order.customerName}</span>
                        <span className="text-xs text-[#616962]">({order.customerPhone})</span>
                      </div>
                      <p className="text-xs text-[#1A1C19] mt-0.5">{order.pickupAddress}, {order.area}</p>
                      <p className="text-[11px] text-[#616962] mt-0.5">Expected delivery: {order.expectedDelivery}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {order.operationsStatus !== 'Delivered' ? (
                        <button
                          onClick={() => updateOperationsStatus(order.id, 'Delivered')}
                          className="py-1.5 px-3 rounded-lg bg-[#004D31] text-white text-xs font-bold hover:bg-[#003E26]"
                        >
                          Mark as Delivered
                        </button>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-[#E8F7EE] text-[#005235] text-xs font-bold">
                          Delivered ✓
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. CUSTOMERS TAB */}
      {activeTab === 'customers' && (
        <div className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#1A1C19]">Subscribed Customers</h2>
          <div className="space-y-3">
            {allCustomers.map(cust => (
              <div key={cust.id} className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E6E1D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <p className="text-sm font-bold text-[#1A1C19]">{cust.name}</p>
                  <p className="text-[#5A635B]">{cust.phone} • {cust.email}</p>
                  <p className="text-[#1A1C19] mt-1">{cust.pickupAddress}, {cust.area}</p>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full bg-[#E8F7EE] text-[#005235] font-bold">
                    {cust.planId === 'regular' ? 'WOSH Regular' : cust.planId === 'plus' ? 'WOSH Plus' : 'WOSH Premium'}
                  </span>
                  <p className="text-[#616962] mt-1">
                    Pickups used: {cust.pickupsUsed} of {cust.pickupsTotal}
                  </p>
                  <p className="text-[#004D31] font-semibold mt-0.5">
                    Basket: {cust.basketStatus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. PROBLEMS TAB */}
      {activeTab === 'problems' && (
        <div className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1A1C19]">Reported Problems</h2>
              <p className="text-xs text-[#5A635B]">
                Missing items, damaged items, stains, or late delivery reports.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#FEE2E2] text-[#B91C1C] text-xs font-bold">
              {openProblems.length} Open
            </span>
          </div>

          <div className="space-y-3">
            {problems.map(prob => (
              <div key={prob.id} className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E6E1D8] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#FEE2E2] text-[#B91C1C] font-bold">
                      {prob.problemType}
                    </span>
                    <strong className="text-[#1A1C19]">{prob.orderId}</strong>
                    <span className="text-[#616962]">• {prob.customerName}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full font-bold ${
                      prob.status === 'Resolved'
                        ? 'bg-[#E8F7EE] text-[#005235]'
                        : 'bg-[#FEF3C7] text-[#B45309]'
                    }`}
                  >
                    {prob.status}
                  </span>
                </div>

                <p className="text-[#1A1C19] bg-white p-2.5 rounded-lg border border-[#E6E1D8]">
                  "{prob.description}"
                </p>

                {prob.resolutionNote && (
                  <p className="text-[#005235] bg-[#E8F7EE] p-2 rounded-lg text-[11px]">
                    <strong>Resolution:</strong> {prob.resolutionNote}
                  </p>
                )}

                {prob.status !== 'Resolved' && (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => resolveProblem(prob.id, 'Sorted with customer in Lagos center.')}
                      className="py-1 px-3 rounded-lg bg-[#004D31] text-white text-xs font-bold hover:bg-[#003E26]"
                    >
                      Mark as Resolved
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
