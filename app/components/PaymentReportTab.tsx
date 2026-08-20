import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Search
} from 'lucide-react';

interface InvoiceReport {
  id: string;
  date: string;
  description: string;
  amount: number;
  paymentMode: string;
  utr: string;
  status: 'PAID' | 'PENDING' | 'FAILED';
}

export default function PaymentReportTab() {
  const [searchQuery, setSearchQuery] = useState('');

  const invoices: InvoiceReport[] = [
    {
      id: 'INV-2025-003',
      date: 'Feb 01, 2025',
      description: 'Pro Merchant Subscription (1 Month Renewal)',
      amount: 499.00,
      paymentMode: 'UPI (upiedge.store@okhdfcbank)',
      utr: '421884920184',
      status: 'PAID'
    },
    {
      id: 'INV-2025-002',
      date: 'Jan 01, 2025',
      description: 'Pro Merchant Subscription (1 Month Renewal)',
      amount: 499.00,
      paymentMode: 'UPI (upiedge.store@okhdfcbank)',
      utr: '421884610294',
      status: 'PAID'
    },
    {
      id: 'INV-2024-001',
      date: 'Dec 01, 2024',
      description: 'Pro Merchant Initial Plan Activation',
      amount: 499.00,
      paymentMode: 'UPI Direct Intent',
      utr: '421884109482',
      status: 'PAID'
    }
  ];

  const totalSpent = invoices.reduce((acc, inv) => acc + inv.amount, 0);

  const filteredInvoices = invoices.filter(inv => 
    inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.utr.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-16 w-full">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Payment & Billing Report</h2>
        <p className="text-xs text-slate-500">
          Complete statement of all your gateway plan purchases, renewals, and official tax invoices.
        </p>
      </div>

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Total Spent on Gateway</span>
          <div className="text-2xl font-bold text-slate-900 mt-1 font-mono">₹{totalSpent.toFixed(2)}</div>
          <p className="text-[11px] text-slate-400 mt-1">Across {invoices.length} billing cycles</p>
        </div>

        <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Paid Invoices</span>
          <div className="text-2xl font-bold text-emerald-600 mt-1 font-mono">{invoices.length} Invoices</div>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">All payments settled</p>
        </div>

        <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Primary Payment Method</span>
          <div className="text-sm font-bold text-slate-900 mt-1.5 truncate">UPI (HDFC Bank)</div>
          <p className="text-[11px] text-slate-500 mt-1">Instant Bank Settlement</p>
        </div>
      </div>

      {/* Invoices List Card */}
      <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Payment Statement & Invoices</h3>
            <p className="text-xs text-slate-500">Download official PDF receipts for your accounting records</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Invoice or UTR..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500 transition"
            />
          </div>
        </div>

        {/* Invoices Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold">
                <th className="py-2.5 px-3.5">Invoice ID</th>
                <th className="py-2.5 px-3.5">Date</th>
                <th className="py-2.5 px-3.5">Plan / Description</th>
                <th className="py-2.5 px-3.5">Bank UTR</th>
                <th className="py-2.5 px-3.5">Amount</th>
                <th className="py-2.5 px-3.5">Status</th>
                <th className="py-2.5 px-3.5 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-3.5 font-mono font-bold text-slate-900">{inv.id}</td>
                  <td className="py-3 px-3.5 text-slate-600 font-medium">{inv.date}</td>
                  <td className="py-3 px-3.5">
                    <div className="font-semibold text-slate-800">{inv.description}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{inv.paymentMode}</div>
                  </td>
                  <td className="py-3 px-3.5 font-mono text-slate-600 font-medium">{inv.utr}</td>
                  <td className="py-3 px-3.5 font-bold text-slate-900">₹{inv.amount.toFixed(2)}</td>
                  <td className="py-3 px-3.5">
                    <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-right">
                    <button
                      onClick={() => alert(`Downloading official PDF receipt for ${inv.id}...`)}
                      className="px-2.5 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-[11px] transition inline-flex items-center gap-1 border border-blue-200 shadow-xs"
                    >
                      <Download className="w-3 h-3" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
