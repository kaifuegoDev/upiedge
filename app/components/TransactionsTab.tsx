import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Eye, 
  Copy, 
  Check, 
  QrCode, 
  X, 
  Zap, 
  Inbox 
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Transaction } from '../types';

interface TransactionsTabProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  openWebhookTesterWithOrder?: (orderId: string) => void;
}

const STATUS_TABS = [
  { id: 'ALL', label: 'All Orders', dot: null },
  { id: 'SUCCESS', label: 'Success', dot: 'bg-emerald-500' },
  { id: 'PENDING', label: 'Pending', dot: 'bg-amber-500' },
  { id: 'FAILED', label: 'Failed', dot: 'bg-rose-500' },
  { id: 'EXPIRED', label: 'Expired', dot: 'bg-slate-400' },
];

export default function TransactionsTab({
  transactions,
  setTransactions,
  searchQuery = '',
  setSearchQuery
}: TransactionsTabProps) {
  const [localSearch, setLocalSearch] = useState<string>('');
  const activeSearch = searchQuery || localSearch;
  const handleSearchChange = (q: string) => {
    if (setSearchQuery) setSearchQuery(q);
    setLocalSearch(q);
  };
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [activeModalTxn, setActiveModalTxn] = useState<Transaction | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSimulatingSuccess, setIsSimulatingSuccess] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const filteredTransactions = transactions.filter((txn) => {
    const matchesStatus = selectedStatus === 'ALL' || txn.status === selectedStatus;
    const query = activeSearch.toLowerCase().trim();
    const matchesQuery = 
      query === '' ||
      txn.orderId.toLowerCase().includes(query) ||
      (txn.utr && txn.utr.toLowerCase().includes(query)) ||
      (txn.customerUpi && txn.customerUpi.toLowerCase().includes(query)) ||
      (txn.customerName && txn.customerName.toLowerCase().includes(query));
    return matchesStatus && matchesQuery;
  });

  const handleMarkAsPaid = (txnId: string) => {
    setIsSimulatingSuccess(txnId);
    setTimeout(() => {
      const generatedUtr = '4218' + Math.floor(10000000 + Math.random() * 90000000);
      setTransactions(prev => prev.map(t => {
        if (t.id === txnId) {
          return {
            ...t,
            status: 'SUCCESS',
            webhookStatus: 'DELIVERED',
            utr: generatedUtr,
            completedAt: 'Just now'
          };
        }
        return t;
      }));
      setIsSimulatingSuccess(null);
      if (activeModalTxn && activeModalTxn.id === txnId) {
        setActiveModalTxn(prev => prev ? {
          ...prev,
          status: 'SUCCESS',
          webhookStatus: 'DELIVERED',
          utr: generatedUtr,
          completedAt: 'Just now'
        } : null);
      }
    }, 1000);
  };

  const handleExportCSV = () => {
    const headers = ['Order ID', 'Amount (INR)', 'Status', 'UTR', 'Customer UPI', 'Customer Name', 'UPI Handle', 'Created At'];
    const rows = filteredTransactions.map(t => [
      t.orderId,
      t.amount,
      t.status,
      t.utr || 'N/A',
      t.customerUpi || 'N/A',
      t.customerName || 'N/A',
      t.upiHandle,
      t.createdAt
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `upiedge_transactions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Orders & Transactions</h2>
          <p className="text-xs text-slate-500">
            Real-time tracking of dynamic UPI payments and automated bank UTR reconciliations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs transition active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Status Segmented Control */}
        <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-lg border border-slate-200/70 overflow-x-auto">
          {STATUS_TABS.map((tab) => {
            const count = tab.id === 'ALL' 
              ? transactions.length 
              : transactions.filter(t => t.status === tab.id).length;
            const isActive = selectedStatus === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-2xs border border-slate-200/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {tab.dot && (
                  <span className={`w-1.5 h-1.5 rounded-full ${tab.dot}`} />
                )}
                <span>{tab.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  isActive 
                    ? 'bg-slate-100 text-slate-900 font-bold' 
                    : 'bg-slate-200/70 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search inside table */}
        <div className="relative min-w-[260px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search Order ID, UPI, UTR..."
            value={activeSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full bg-slate-50/80 border border-slate-200/90 rounded-lg pl-8 pr-8 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-900/5 transition"
          />
          {activeSearch && (
            <button 
              onClick={() => handleSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-xl bg-white border border-slate-200/90 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold">
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer & UPI</th>
                <th className="py-3.5 px-4">Settled Handle</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Bank UTR</th>
                <th className="py-3.5 px-4">Payment Status</th>
                <th className="py-3.5 px-4">Webhook</th>
                <th className="py-3.5 px-4">Time</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center">
                    <div className="max-w-sm mx-auto flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 shadow-2xs">
                        <Inbox className="w-6 h-6 stroke-[1.5]" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-800">
                          {transactions.length === 0 ? 'No transactions yet' : 'No matching transactions'}
                        </p>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {transactions.length === 0
                            ? 'When customers initiate UPI payments or scan your QR code, live transactions will appear here.'
                            : 'No records matched your search filters. Try clearing your search query or switching status tabs.'}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <span>{txn.orderId}</span>
                        <button
                          onClick={() => copyToClipboard(txn.orderId, `order_${txn.id}`)}
                          className="text-slate-400 hover:text-slate-700 p-0.5"
                          title="Copy Order ID"
                        >
                          {copiedField === `order_${txn.id}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{txn.customerName || 'Direct Payer'}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{txn.customerUpi || 'Web QR Scan'}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      {txn.upiHandle.split('@')[0]}@...
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 text-sm">₹{txn.amount.toFixed(2)}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      {txn.utr ? (
                        <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {txn.utr}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">Unmatched</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        txn.status === 'SUCCESS'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : txn.status === 'PENDING'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          txn.status === 'SUCCESS' ? 'bg-emerald-500' : txn.status === 'PENDING' ? 'bg-amber-500' : 'bg-rose-500'
                        }`} />
                        {txn.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold border ${
                        txn.webhookStatus === 'DELIVERED'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {txn.webhookStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono whitespace-nowrap">
                      {txn.createdAt}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {txn.status === 'PENDING' && (
                          <button
                            onClick={() => handleMarkAsPaid(txn.id)}
                            disabled={isSimulatingSuccess === txn.id}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[11px] font-bold transition active:scale-95 disabled:opacity-50"
                            title="Simulate incoming bank SMS/Notification"
                          >
                            {isSimulatingSuccess === txn.id ? 'Matching...' : 'Simulate Paid'}
                          </button>
                        )}
                        <button
                          onClick={() => setActiveModalTxn(txn)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                          title="View Details & QR"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {activeModalTxn && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span>Order #{activeModalTxn.orderId}</span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-md border font-bold ${
                      activeModalTxn.status === 'SUCCESS' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {activeModalTxn.status}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500">Created {activeModalTxn.createdAt}</p>
                </div>
              </div>

              <button
                onClick={() => setActiveModalTxn(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[75vh] overflow-y-auto">
              {/* Left Column: QR Code */}
              <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <div className="p-3 bg-white rounded-lg shadow-xs border border-slate-200 mb-3">
                  <QRCodeSVG
                    value={activeModalTxn.intentUrl}
                    size={160}
                    level="H"
                    includeMargin={false}
                  />
                </div>
                <p className="text-xs font-bold text-slate-900 mb-1">Dynamic UPI QR Code</p>
                <p className="text-[11px] text-slate-500 font-mono mb-3">Compatible with PhonePe, GPay, Paytm, Cred</p>

                <div className="w-full p-2.5 rounded-md bg-white border border-slate-200 text-[11px] font-mono text-left break-all text-slate-700">
                  <div className="flex items-center justify-between mb-1 text-slate-400">
                    <span className="font-semibold text-[10px]">UPI Intent Link</span>
                    <button
                      onClick={() => copyToClipboard(activeModalTxn.intentUrl, 'intent_url')}
                      className="text-slate-400 hover:text-blue-600"
                    >
                      {copiedField === 'intent_url' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  {activeModalTxn.intentUrl}
                </div>
              </div>

              {/* Right Column: Key Details */}
              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-2">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Payable Amount:</span>
                    <span className="font-bold text-slate-900 text-sm">₹{activeModalTxn.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Destination VPA:</span>
                    <span className="font-mono font-semibold text-blue-700">{activeModalTxn.upiHandle}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Bank UTR:</span>
                    <span className="font-mono font-bold text-slate-900">
                      {activeModalTxn.utr || <span className="text-slate-400 italic">Not available</span>}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Customer UPI:</span>
                    <span className="font-mono text-slate-700">{activeModalTxn.customerUpi || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Payment Note:</span>
                    <span className="text-slate-700 font-medium">{activeModalTxn.note}</span>
                  </div>
                </div>

                {/* Webhook Dispatch Info */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-800">Webhook Notification</span>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {activeModalTxn.webhookStatus}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                    Merchant server confirmed receipt with HTTP 200 OK.
                  </p>
                  {activeModalTxn.status === 'PENDING' && (
                    <button
                      onClick={() => handleMarkAsPaid(activeModalTxn.id)}
                      className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center gap-2"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Simulate Immediate Match</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Ref: {activeModalTxn.id}</span>
              <button
                onClick={() => setActiveModalTxn(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-xs font-semibold text-slate-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
