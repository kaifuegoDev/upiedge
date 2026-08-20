'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Store, 
  Plus, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  ToggleLeft,
  ToggleRight,
  MoreVertical,
  Building2,
  Trash2
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
          Multi Merchant Accounts
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage and route dynamic UPI transactions across multiple connected merchant accounts.
        </p>
      </div>

      {/* Main Content Area */}
      {merchants.length === 0 ? (
        /* Empty State */
        <div className="p-12 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-center space-y-4">
          <div className="py-6 flex flex-col items-center justify-center space-y-3">
            {/* Clipboard Empty Icon (Consistent Design Across App) */}
            <div className="w-14 h-16 rounded-xl bg-slate-200/90 flex flex-col items-center justify-center mx-auto relative shadow-2xs pt-1">
              <div className="w-6 h-2 bg-slate-400/90 rounded-full absolute -top-1" />
              <div className="space-y-1.5 w-7">
                <div className="h-1 bg-slate-400/80 rounded-full w-full" />
                <div className="h-1 bg-slate-400/80 rounded-full w-4" />
              </div>
              <div className="w-4 h-4 rounded-full bg-slate-600 text-white flex items-center justify-center text-[9px] font-bold absolute -bottom-1 -right-1 shadow-xs">
                ✕
              </div>
            </div>

            <div className="space-y-1 max-w-sm mx-auto">
              <h3 className="text-sm font-bold text-slate-800">No merchant connected</h3>
              <p className="text-xs text-slate-500">
                Connect your merchant accounts to enable multi-account UPI routing.
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
                    <Store className="w-5 h-5" />
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

      {/* Feature & Benefits Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-4.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Smart Limit Balancing</h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Auto-split transactions across multiple VPAs to easily bypass single-bank daily collection caps.
            </p>
          </div>
        </div>

        <div className="p-4.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Zero-Downtime Failover</h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              If any bank UPI server is down, traffic automatically switches to active backup handles.
            </p>
          </div>
        </div>

        <div className="p-4.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Multi-Bank Settlement</h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Route payments directly into different business accounts with instant verification and 0% MDR.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
