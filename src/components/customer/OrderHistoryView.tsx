import React from 'react';
import { useWosh } from '../../context/WoshContext';
import { PackageCheck, Calendar, Clock, CheckCircle, ArrowRight, ShoppingBag } from 'lucide-react';

export const OrderHistoryView: React.FC = () => {
  const { orders, currentUser, setRequestPickupModalOpen } = useWosh();

  const customerOrders = orders.filter(o => o.customerId === currentUser.id);

  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#1A1C19]">
            Order History
          </h1>
          <p className="text-sm text-[#5A635B]">
            All your past laundry pickups and deliveries in Lagos.
          </p>
        </div>
        <button
          onClick={() => setRequestPickupModalOpen(true)}
          className="py-2 px-3.5 rounded-xl bg-[#004D31] text-white text-xs font-bold hover:bg-[#003E26] transition-all flex items-center gap-1.5 shadow-xs"
        >
          <span>New Pickup</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Orders List */}
      {customerOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 border border-[#E6E1D8] text-center">
          <ShoppingBag className="w-10 h-10 text-[#5A635B] mx-auto mb-2" />
          <p className="text-sm font-bold text-[#1A1C19]">No orders yet</p>
          <p className="text-xs text-[#5A635B] mt-1">
            When you request your first pickup, your laundry history will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {customerOrders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs flex flex-col gap-3 hover:border-[#004D31]/30 transition-all"
            >
              <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#1A1C19]">
                    {order.id}
                  </span>
                  <span className="text-xs text-[#616962]">• {order.createdAt}</span>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    order.customerStatus === 'Delivered'
                      ? 'bg-[#E8F7EE] text-[#005235]'
                      : 'bg-[#FFF6E6] text-[#B45309]'
                  }`}
                >
                  {order.customerStatus}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-[#5A635B]">
                <div>
                  <span className="text-[#616962]">Clothes Count:</span>{' '}
                  <strong className="text-[#1A1C19]">~{order.itemCountEstimated} items</strong>
                </div>
                <div>
                  <span className="text-[#616962]">Expected / Return:</span>{' '}
                  <strong className="text-[#1A1C19]">{order.expectedDelivery}</strong>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#FAF7F2] text-[11px] text-[#616962] flex items-center justify-between">
                <span>Preferences: {order.fragrance} • {order.starch}</span>
                <span className="font-semibold text-[#004D31]">Ikoyi Center</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
