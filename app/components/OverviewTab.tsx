import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Link as LinkIcon, 
  MoreVertical, 
  Check, 
  AlertCircle, 
  FileX, 
  ExternalLink,
  ChevronRight,
  Store,
  QrCode
} from 'lucide-react';
import { Transaction, UpiDevice } from '../types';

interface OverviewTabProps {
  transactions?: Transaction[];
  devices?: UpiDevice[];
  setActiveTab?: (tab: string) => void;
  openCreatePayment?: () => void;
}

export default function OverviewTab({
  transactions = [],
  setActiveTab
}: OverviewTabProps) {
  // Filter today's transactions (if any)
  const todayTxns = transactions.filter(t => t.createdAt?.includes('Just now') || t.createdAt?.includes('Today'));
  const todayAmount = todayTxns.filter(t => t.status === 'SUCCESS').reduce((acc, t) => acc + t.amount, 0);
  const todaySuccessCount = todayTxns.filter(t => t.status === 'SUCCESS').length;
  const todayFailedCount = todayTxns.filter(t => t.status === 'FAILED').length;

  const last10Days = [
    { date: '09 Aug', amount: 0 },
    { date: '10 Aug', amount: 0 },
    { date: '11 Aug', amount: 0 },
    { date: '12 Aug', amount: 0 },
    { date: '13 Aug', amount: 0 },
    { date: '14 Aug', amount: 0 },
    { date: '15 Aug', amount: 0 },
    { date: '16 Aug', amount: 0 },
    { date: '17 Aug', amount: 0 },
    { date: '18 Aug', amount: todayAmount }
  ];

  return (
    <div className="space-y-6 pb-16 w-full font-sans">
      {/* 1. Header Greeting */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">Welcome, Demo User</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Accept payments online hassle-free with our QR code service.
        </p>
      </div>

      {/* 2. Announcement / Promo Cards */}
      <div className="space-y-4">
        {/* Card 1: GPay For Business */}
        <div className="p-5 rounded-lg bg-white border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* GPay Business Icon Box */}
            <div className="w-14 h-14 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center p-2 shrink-0">
              <Store className="w-7 h-7 text-slate-800" />
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-900 leading-snug">
                Exciting news! Accept payments in your GPay For Business account
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Now receive your customer's payment in your GPay account and instantly verify the transaction.
              </p>
            </div>
          </div>

          <Link
            href="/user/connect-merchant"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 hover:text-blue-600 underline underline-offset-4 shrink-0 transition"
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Connect Merchant</span>
          </Link>
        </div>

        {/* Card 2: Mobile UPI App Feature */}
        <div className="p-5 rounded-lg bg-white border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* QR Mockup Box */}
            <div className="w-14 h-14 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center p-2 shrink-0">
              <QrCode className="w-7 h-7 text-slate-800" />
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-900 leading-snug">
                New Feature: Now Make Payments Using Installed UPI App on Your Mobile
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                *This feature is exclusively available in the Enterprise plan. It may not be supported by all UPI apps.
              </p>
            </div>
          </div>

          <Link
            href="/user/buy-plan"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 hover:text-blue-600 underline underline-offset-4 shrink-0 transition"
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Enabled Now</span>
          </Link>
        </div>
      </div>

      {/* 3. Today's Statistics Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: Today Receive Amount */}
        <div className="p-5 rounded-lg bg-white border border-slate-200/90 shadow-2xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-base shrink-0">
            ₹
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 font-mono">₹{todayAmount}</div>
            <div className="text-xs text-slate-500 font-medium">Today Receive Amount</div>
          </div>
        </div>

        {/* Metric 2: Today Success Transaction */}
        <div className="p-5 rounded-lg bg-white border border-slate-200/90 shadow-2xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold shrink-0">
            <Check className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 font-mono">{todaySuccessCount}</div>
            <div className="text-xs text-slate-500 font-medium">Today Success Transaction</div>
          </div>
        </div>

        {/* Metric 3: Today Failed Transaction */}
        <div className="p-5 rounded-lg bg-white border border-slate-200/90 shadow-2xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold shrink-0">
            <span className="text-base font-black">!</span>
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 font-mono">{todayFailedCount}</div>
            <div className="text-xs text-slate-500 font-medium">Today Failed Transaction</div>
          </div>
        </div>
      </div>

      {/* 4. Analytics Row: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Last 10 Days Statistics */}
        <div className="lg:col-span-8 p-6 rounded-lg bg-white border border-slate-200/90 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Last 10 Days Statistics</h3>
            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
              <span>Received Amount</span>
            </div>
          </div>

          {/* SVG Line Chart Representation */}
          <div className="h-64 w-full flex flex-col justify-between pt-4">
            <div className="flex-1 w-full grid grid-cols-10 items-end gap-2 border-b border-slate-200 relative pb-1">
              {/* Horizontal Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                <div className="border-b border-slate-200 w-full" />
                <div className="border-b border-slate-200 w-full" />
                <div className="border-b border-slate-200 w-full" />
                <div className="border-b border-slate-200 w-full" />
              </div>

              {last10Days.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center justify-end h-full relative z-10 group">
                  <div 
                    style={{ height: item.amount > 0 ? '65%' : '2px' }} 
                    className={`w-4 rounded-t-sm transition-all ${
                      item.amount > 0 ? 'bg-blue-600 shadow-xs' : 'bg-slate-200'
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* X-Axis Dates */}
            <div className="grid grid-cols-10 gap-2 pt-2 text-[10px] text-slate-400 text-center font-medium">
              {last10Days.map((item, idx) => (
                <span key={idx} className="truncate">{item.date}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: QR Transactions Statistics */}
        <div className="lg:col-span-4 p-6 rounded-lg bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">QR Transactions Statistics</h3>
            <button className="text-slate-400 hover:text-slate-600 p-1">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Circular Donut Progress Ring */}
          <div className="flex flex-col items-center justify-center my-auto">
            <div className="relative w-44 h-44 flex items-center justify-center">
              {/* Background Circular Ring */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-slate-100"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-blue-600 transition-all duration-500"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={todaySuccessCount > 0 ? "245" : "251.2"}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute text-center">
                <div className="text-xl font-extrabold text-slate-900 font-mono">
                  {todaySuccessCount} / 4999
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Statistics Legend */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>Total Txns</span>
                </div>
                <div className="text-base font-extrabold text-slate-900 mt-0.5 font-mono">4999</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium">
                  <span className="w-2 h-2 rounded-full bg-blue-300" />
                  <span>Used Txns</span>
                </div>
                <div className="text-base font-extrabold text-slate-900 mt-0.5 font-mono">{todaySuccessCount}</div>
              </div>
            </div>

            <div className="text-center pt-1">
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>Plan Expire</span>
              </div>
              <div className="text-xs font-bold text-slate-900 mt-0.5">No Active Plan</div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Today Activity Section */}
      <div className="rounded-lg bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
        {/* Table Header Row */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Today Activity</h3>
          <Link
            href="/user/transactions"
            className="px-3.5 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition"
          >
            View All Transactions
          </Link>
        </div>

        {/* Activity Content */}
        {todayTxns.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50/50 text-slate-600 border-b border-slate-100 text-[11px] font-bold">
                <tr>
                  <th className="py-3 px-4 text-center">#</th>
                  <th className="py-3 px-4 text-center">Customer Phone</th>
                  <th className="py-3 px-4 text-center">Client Txn ID</th>
                  <th className="py-3 px-4 text-center">Amount</th>
                  <th className="py-3 px-4 text-center">Convenience Fee</th>
                  <th className="py-3 px-4 text-center">Total</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Webhook Status</th>
                  <th className="py-3 px-4 text-center">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {todayTxns.map((txn, index) => (
                  <tr key={txn.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3.5 px-4 font-mono text-slate-400 text-center">{index + 1}</td>
                    <td className="py-3.5 px-4 text-slate-700 text-center font-medium">{txn.customerPhone || '9876543210'}</td>
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-900 text-center">{txn.orderId}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 text-center">₹{txn.amount.toFixed(2)}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-500 text-center">₹0.00</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 text-center">₹{txn.amount.toFixed(2)}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {txn.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {txn.webhookStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-center font-medium">{txn.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Empty State Matching Screenshot */
          <div className="py-14 text-center space-y-3">
            {/* Clipboard Empty Icon */}
            <div className="w-14 h-16 rounded-lg bg-slate-300/60 flex items-center justify-center mx-auto relative shadow-2xs">
              <div className="w-6 h-2 bg-slate-400 rounded-full absolute -top-1" />
              <div className="space-y-1 w-7">
                <div className="h-1 bg-slate-400 rounded-full w-full" />
                <div className="h-1 bg-slate-400 rounded-full w-4" />
              </div>
              <div className="w-4 h-4 rounded-full bg-slate-500 text-white flex items-center justify-center text-[9px] font-bold absolute -bottom-1 -right-1">
                ✕
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium">No transactions today</p>
          </div>
        )}
      </div>
    </div>
  );
}
