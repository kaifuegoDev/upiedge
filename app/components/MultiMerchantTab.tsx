'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Plus, 
  ToggleLeft, 
  ToggleRight 
} from 'lucide-react';

interface ConnectedMerchant {
  id: string;
  name: string;
  provider: string;
  vpa: string;
  status: 'ACTIVE' | 'STANDBY' | 'INACTIVE';
  dailyVolume: number;
  totalTransactions: number;
  connectedAt: string;
  isAutoRotate: boolean;
}

export default function MultiMerchantTab() {
  const [merchants, setMerchants] = useState<ConnectedMerchant[]>([]);

  return (
    <div className="space-y-6 pb-16 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">
          Merchant Accounts
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage and route dynamic UPI transactions across connected merchant accounts.
        </p>
      </div>

      {/* Main Content Area */}
      {merchants.length === 0 ? (
        /* Empty State */
        <div className="p-12 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-center space-y-4">
          <div className="py-6 flex flex-col items-center justify-center space-y-3">
            {/* Merchant Empty Icon */}
            <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200/80 flex items-center justify-center mx-auto shadow-2xs">
              <Building2 className="w-7 h-7 text-slate-500 stroke-[1.8]" />
            </div>

            <div className="space-y-1 max-w-sm mx-auto">
              <h3 className="text-sm font-bold text-slate-800">No merchant connected</h3>
              <p className="text-xs text-slate-500">
                Connect your merchant accounts to enable automated UPI routing.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/user/connect-merchant"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Connect Merchant</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Merchants List */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {merchants.map((merchant) => (
            <div
              key={merchant.id}
              className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{merchant.name}</h4>
                    <span className="text-[11px] font-mono text-slate-500">{merchant.vpa}</span>
                  </div>
                </div>

                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                  merchant.status === 'ACTIVE' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {merchant.status}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Auto Rotation</span>
                <button
                  onClick={() => {
                    setMerchants(prev => prev.map(m => m.id === merchant.id ? { ...m, isAutoRotate: !m.isAutoRotate } : m));
                  }}
                  className="text-slate-900"
                >
                  {merchant.isAutoRotate ? (
                    <ToggleRight className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-slate-400" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
