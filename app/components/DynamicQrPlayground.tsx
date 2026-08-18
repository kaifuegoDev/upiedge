import React, { useState } from 'react';
import { 
  Smartphone, 
  Copy, 
  Check, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  RefreshCw
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Transaction } from '../types';

interface DynamicQrPlaygroundProps {
  onAddTransaction: (txn: Transaction) => void;
  setActiveTab: (tab: string) => void;
}

export default function DynamicQrPlayground({
  onAddTransaction,
  setActiveTab
}: DynamicQrPlaygroundProps) {
  const [amount, setAmount] = useState<number>(499.00);
  const [orderId, setOrderId] = useState<string>(() => 'ORD_' + Math.floor(10000 + Math.random() * 90000));
  const [customerName, setCustomerName] = useState<string>('Alex Johnson');
  const [customerPhone, setCustomerPhone] = useState<string>('+91 98765 43210');
  const [note, setNote] = useState<string>('SaaS Subscription Upgrade');
  const [selectedVpa, setSelectedVpa] = useState<string>('upiedge.store@okhdfcbank');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const encodedNote = encodeURIComponent(note || 'Payment');
  const upiIntentUri = `upi://pay?pa=${selectedVpa}&pn=UPIEdgeStore&am=${amount.toFixed(2)}&cu=INR&tr=${orderId}&tn=${encodedNote}`;

  const gpayUri = `tez://upi/pay?pa=${selectedVpa}&pn=UPIEdgeStore&am=${amount.toFixed(2)}&cu=INR&tr=${orderId}&tn=${encodedNote}`;
  const phonepeUri = `phonepe://pay?pa=${selectedVpa}&pn=UPIEdgeStore&am=${amount.toFixed(2)}&cu=INR&tr=${orderId}&tn=${encodedNote}`;
  const paytmUri = `paytmmp://pay?pa=${selectedVpa}&pn=UPIEdgeStore&am=${amount.toFixed(2)}&cu=INR&tr=${orderId}&tn=${encodedNote}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(upiIntentUri);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleRegenerateOrderId = () => {
    setOrderId('ORD_' + Math.floor(10000 + Math.random() * 90000));
    setPaymentSuccess(false);
  };

  const handleSimulatePayment = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setPaymentSuccess(true);

      const generatedUtr = '4218' + Math.floor(10000000 + Math.random() * 90000000);
      const newTxn: Transaction = {
        id: 'tx_' + Date.now().toString().slice(-6),
        orderId,
        amount,
        customerName: customerName || 'Direct Payer',
        customerPhone,
        customerUpi: 'user@okhdfcbank',
        utr: generatedUtr,
        status: 'SUCCESS',
        webhookStatus: 'DELIVERED',
        upiHandle: selectedVpa,
        note,
        createdAt: 'Just now',
        completedAt: 'Just now',
        intentUrl: upiIntentUri
      };

      onAddTransaction(newTxn);
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>Dynamic QR Generator</span>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded border border-blue-200">
              Live Test Studio
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            Generate and test dynamic UPI payment QR codes with custom order metadata, amounts, and intent links.
          </p>
        </div>

        <button
          onClick={handleRegenerateOrderId}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>New Order</span>
        </button>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Configuration Form */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
              Order Parameters
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Amount */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Order Amount (₹ INR) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    min="1"
                    step="0.5"
                    value={amount}
                    onChange={(e) => { setAmount(parseFloat(e.target.value) || 0); setPaymentSuccess(false); }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-7 pr-3 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Order ID */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Order Reference ID <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => { setOrderId(e.target.value); setPaymentSuccess(false); }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-blue-700 font-bold focus:outline-none focus:bg-white focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Destination UPI VPA */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Receiving Merchant UPI ID
              </label>
              <select
                value={selectedVpa}
                onChange={(e) => { setSelectedVpa(e.target.value); setPaymentSuccess(false); }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500 transition"
              >
                <option value="upiedge.store@okhdfcbank">upiedge.store@okhdfcbank (HDFC Current A/c)</option>
                <option value="payments.upiedge@icici">payments.upiedge@icici (ICICI Business A/c)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500 transition"
                />
              </div>

              {/* Customer Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Customer Phone (Optional)
                </label>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Payment Memo / Note
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Transaction note"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Quick Deep Link Launchers */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-blue-600" />
              <span>Mobile UPI Intent Deep Links</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <a
                href={phonepeUri}
                className="p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-center transition flex flex-col items-center gap-1 group"
              >
                <span className="text-xs font-bold text-purple-700">PhonePe</span>
                <span className="text-[10px] text-purple-600">Direct App</span>
              </a>

              <a
                href={gpayUri}
                className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-center transition flex flex-col items-center gap-1 group"
              >
                <span className="text-xs font-bold text-blue-700">Google Pay</span>
                <span className="text-[10px] text-blue-600">Tez App</span>
              </a>

              <a
                href={paytmUri}
                className="p-2.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 text-center transition flex flex-col items-center gap-1 group"
              >
                <span className="text-xs font-bold text-cyan-700">Paytm</span>
                <span className="text-[10px] text-cyan-600">Paytm MP</span>
              </a>

              <a
                href={upiIntentUri}
                className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-center transition flex flex-col items-center gap-1 group"
              >
                <span className="text-xs font-bold text-emerald-700">Any UPI</span>
                <span className="text-[10px] text-emerald-600">Default Intent</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Live Dynamic QR & Action Box */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col items-center text-center relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Dynamic UPI QR Preview
              </span>
            </div>

            {/* QR Card */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm mb-4">
              <QRCodeSVG
                value={upiIntentUri}
                size={200}
                level="H"
                includeMargin={false}
              />
              <div className="mt-2 text-center">
                <span className="text-[10px] font-bold tracking-widest text-slate-700 uppercase font-mono">
                  SCAN WITH ANY UPI APP
                </span>
              </div>
            </div>

            {/* Amount Badge */}
            <div className="mb-4">
              <div className="text-2xl font-black text-slate-900 tracking-tight">
                ₹{amount.toFixed(2)}
              </div>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">Order: {orderId}</p>
            </div>

            {/* Raw Link copy */}
            <div className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-mono text-left flex items-center justify-between text-slate-700 mb-4">
              <span className="truncate pr-2">{upiIntentUri}</span>
              <button
                onClick={handleCopyLink}
                className="p-1 rounded bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 transition shrink-0"
                title="Copy Intent URL"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Action Simulator Button */}
            {paymentSuccess ? (
              <div className="w-full p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Payment Verified! Added to Transactions</span>
              </div>
            ) : (
              <button
                onClick={handleSimulatePayment}
                disabled={isSimulating || amount <= 0}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Matching Bank Confirmation...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-white fill-current" />
                    <span>Simulate Scan & Bank Confirmation</span>
                  </>
                )}
              </button>
            )}

            {paymentSuccess && (
              <button
                onClick={() => setActiveTab('transactions')}
                className="mt-3 text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>View in Transactions List</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
