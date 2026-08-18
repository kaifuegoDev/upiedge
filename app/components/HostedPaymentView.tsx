'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { 
  ArrowLeft, 
  X, 
  CheckCircle2, 
  Layers,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  MoreHorizontal
} from 'lucide-react';
import bhimImg from '../assets/bhim (1).jpg';
import freechargeImg from '../assets/freecharge.png';
import gpayImg from '../assets/images (20).jpg';
import paytmImg from '../assets/paytm-logo-png_seeklogo-501241.png';
import phonepeImg from '../assets/images (1).png';

interface HostedPaymentViewProps {
  orderId?: string;
  amount?: number;
  upiVpa?: string;
  payeeName?: string;
  note?: string;
  onClose?: () => void;
  onPaymentSuccess?: (orderId: string, utr: string) => void;
}

// Unified High-Quality Brand Icon Components
interface IconProps {
  size?: 'sm' | 'md';
}

const PhonePeIcon = ({ size = 'md' }: IconProps) => (
  <div className={`${size === 'sm' ? 'w-7 h-7' : 'w-9.5 h-9.5'} rounded-md bg-white border border-slate-200 overflow-hidden flex items-center justify-center shadow-2xs shrink-0 select-none`}>
    <Image src={phonepeImg} alt="PhonePe" className="w-full h-full object-cover" />
  </div>
);

const GPayIcon = ({ size = 'md' }: IconProps) => (
  <div className={`${size === 'sm' ? 'w-7 h-7' : 'w-9.5 h-9.5'} rounded-md bg-white border border-slate-200 overflow-hidden flex items-center justify-center shadow-2xs shrink-0 select-none`}>
    <Image src={gpayImg} alt="Google Pay" className="w-full h-full object-cover" />
  </div>
);

const PaytmIcon = ({ size = 'md' }: IconProps) => (
  <div className={`${size === 'sm' ? 'w-7 h-7' : 'w-9.5 h-9.5'} rounded-md bg-white border border-slate-200 overflow-hidden flex items-center justify-center shadow-2xs shrink-0 select-none`}>
    <Image src={paytmImg} alt="Paytm" className="w-full h-full object-cover" />
  </div>
);

const FreechargeIcon = ({ size = 'md' }: IconProps) => (
  <div className={`${size === 'sm' ? 'w-7 h-7' : 'w-9.5 h-9.5'} rounded-md bg-white border border-slate-200 overflow-hidden flex items-center justify-center shadow-2xs shrink-0 select-none`}>
    <Image src={freechargeImg} alt="Freecharge" className="w-full h-full object-cover" />
  </div>
);

const OtherUpiIcon = ({ size = 'md' }: IconProps) => (
  <div className={`${size === 'sm' ? 'w-7 h-7' : 'w-9.5 h-9.5'} rounded-md bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center shadow-2xs shrink-0 select-none`}>
    <MoreHorizontal className={`${size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5'}`} />
  </div>
);

const UpiQrIcon = ({ size = 'md' }: IconProps) => (
  <div className={`${size === 'sm' ? 'w-7 h-7' : 'w-9.5 h-9.5'} rounded-md bg-white border border-slate-200 overflow-hidden flex items-center justify-center shadow-2xs shrink-0 select-none`}>
    <Image src={bhimImg} alt="UPI" className="w-full h-full object-cover" />
  </div>
);

export default function HostedPaymentView({
  orderId = 'ORD_99182',
  amount = 499.00,
  upiVpa = 'merchant@upi',
  payeeName = 'UPIEdge Demo Merchant',
  note = 'Order #ORD_99182 via UPIEdge Gateway',
  onClose,
  onPaymentSuccess
}: HostedPaymentViewProps) {
  const router = useRouter();
  // 10 minutes countdown timer (546 seconds ~ 09:06)
  const [timeLeft, setTimeLeft] = useState<number>(546);
  const [mobileViewMode, setMobileViewMode] = useState<'apps' | 'qr'>('apps');
  const [selectedApp, setSelectedApp] = useState<string>('qr');
  const [showBreakup, setShowBreakup] = useState<boolean>(false);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState<boolean>(false);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const upiIntentString = `upi://pay?pa=${encodeURIComponent(upiVpa)}&pn=${encodeURIComponent(payeeName)}&am=${amount.toFixed(2)}&cu=INR&tr=${orderId}&tn=${encodeURIComponent(note)}`;

  const handleMobilePayClick = () => {
    if (selectedApp === 'qr') {
      setMobileViewMode('qr');
    } else {
      window.location.href = upiIntentString;
    }
  };

  const handleSimulateSuccess = () => {
    setIsPaid(true);
    if (onPaymentSuccess) {
      onPaymentSuccess(orderId, `UTR${Math.floor(100000000000 + Math.random() * 900000000000)}`);
    }
  };

  return (
    <div className="min-h-screen font-sans select-none text-slate-900">
      
      {/* ========================================================================= */}
      {/* 📱 1. MOBILE & CAPACITOR VIEW (Visible on <md screens)                     */}
      {/* ========================================================================= */}
      <div className="flex flex-col min-h-screen bg-white md:hidden">
        
        {/* Mobile Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={() => {
                if (mobileViewMode === 'qr') {
                  setMobileViewMode('apps');
                } else {
                  setShowCancelConfirm(true);
                }
              }}
              className="p-1 rounded-md text-slate-700 hover:bg-slate-100 transition active:scale-90"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Merchant Brand Logo & Name */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-slate-900 flex items-center justify-center text-white shadow-xs">
                <Layers className="w-4.5 h-4.5" />
              </div>
              <div>
                <h2 className="font-bold text-sm text-slate-900 leading-tight">
                  {payeeName}
                </h2>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Expire in {formatTime(timeLeft)}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Main Body */}
        <main className="flex-1 px-4 py-5 flex flex-col justify-between">
          {isPaid ? (
            /* Mobile Success View */
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 text-center space-y-4 my-auto">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Payment Successful!</h3>
              <div className="p-3 rounded-md bg-slate-50 border border-slate-200 text-xs font-mono space-y-1.5 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-400">Order ID:</span>
                  <span className="font-bold text-slate-900">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Amount Paid:</span>
                  <span className="font-bold text-emerald-700">₹{amount.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  if (onClose) onClose();
                  else router.push('/user/dashboard');
                }}
                className="w-full py-2.5 rounded-md bg-slate-900 text-white font-bold text-xs active:scale-95"
              >
                Continue
              </button>
            </div>
          ) : mobileViewMode === 'apps' ? (
            
            /* -------------------------------------------------- */
            /* SCREEN 1: UPI APPS SELECTION LIST                   */
            /* -------------------------------------------------- */
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 px-0.5">
                UPI Apps
              </h3>

              {/* White Crisp Card with High-Res Brand SVG Rows */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden divide-y divide-slate-100">
                
                {/* 1. PhonePe */}
                <label 
                  onClick={() => setSelectedApp('phonepe')} 
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-3.5">
                    <PhonePeIcon />
                    <span className="text-xs font-bold text-slate-800">PhonePe</span>
                  </div>
                  <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition ${
                    selectedApp === 'phonepe' ? 'border-blue-600' : 'border-slate-300'
                  }`}>
                    {selectedApp === 'phonepe' && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                  </div>
                </label>

                {/* 2. Google Pay */}
                <label 
                  onClick={() => setSelectedApp('gpay')} 
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-3.5">
                    <GPayIcon />
                    <span className="text-xs font-bold text-slate-800">Google Pay</span>
                  </div>
                  <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition ${
                    selectedApp === 'gpay' ? 'border-blue-600' : 'border-slate-300'
                  }`}>
                    {selectedApp === 'gpay' && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                  </div>
                </label>

                {/* 3. Paytm */}
                <label 
                  onClick={() => setSelectedApp('paytm')} 
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-3.5">
                    <PaytmIcon />
                    <span className="text-xs font-bold text-slate-800">Paytm</span>
                  </div>
                  <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition ${
                    selectedApp === 'paytm' ? 'border-blue-600' : 'border-slate-300'
                  }`}>
                    {selectedApp === 'paytm' && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                  </div>
                </label>

                {/* 4. Freecharge */}
                <label 
                  onClick={() => setSelectedApp('freecharge')} 
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-3.5">
                    <FreechargeIcon />
                    <span className="text-xs font-bold text-slate-800">Freecharge</span>
                  </div>
                  <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition ${
                    selectedApp === 'freecharge' ? 'border-blue-600' : 'border-slate-300'
                  }`}>
                    {selectedApp === 'freecharge' && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                  </div>
                </label>

                {/* 6. Other UPI Apps */}
                <label 
                  onClick={() => setSelectedApp('other')} 
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-3.5">
                    <OtherUpiIcon />
                    <span className="text-xs font-bold text-slate-800">Other UPI Apps</span>
                  </div>
                  <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition ${
                    selectedApp === 'other' ? 'border-blue-600' : 'border-slate-300'
                  }`}>
                    {selectedApp === 'other' && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                  </div>
                </label>

                {/* 7. UPI QR (Default Selected) */}
                <label 
                  onClick={() => setSelectedApp('qr')} 
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-3.5">
                    <UpiQrIcon />
                    <span className="text-xs font-bold text-slate-900">UPI QR</span>
                  </div>
                  <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition ${
                    selectedApp === 'qr' ? 'border-blue-600' : 'border-slate-300'
                  }`}>
                    {selectedApp === 'qr' && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                  </div>
                </label>
              </div>

              {/* Powered By Footer in Body */}
              <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium select-none">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                <span>Secured by UPIEdge Gateway</span>
              </div>
            </div>
          ) : (
            
            /* -------------------------------------------------- */
            /* SCREEN 2: SCAN QR CODE TO PAY                      */
            /* -------------------------------------------------- */
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 sm:p-6 flex flex-col items-center text-center space-y-5">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                    Scan QR Code to Pay
                  </h3>
                  <p className="text-xs text-slate-500 font-normal">
                    Open any UPI app and scan this QR code
                  </p>
                </div>

                {/* Supported Apps SVG Row */}
                <div className="flex items-center justify-center gap-2">
                  <PhonePeIcon size="sm" />
                  <GPayIcon size="sm" />
                  <PaytmIcon size="sm" />
                  <FreechargeIcon size="sm" />
                </div>

                {/* Dynamic QR Box with clean rounded-lg */}
                <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-xs">
                  <QRCodeSVG 
                    value={upiIntentString} 
                    size={200} 
                    level="M" 
                    includeMargin={false} 
                  />
                </div>

                {/* Expiry Pill */}
                <div className="text-xs text-slate-600 bg-slate-100 px-4 py-1.5 rounded-full font-medium">
                  This QR will expire in <span className="font-mono font-bold text-slate-900">{formatTime(timeLeft)}</span>
                </div>
              </div>

              {/* Powered By Footer */}
              <div className="pt-4 text-center">
                <p className="text-xs text-slate-400 font-medium flex items-center justify-center gap-1.5">
                  <span>Powered by</span>
                  <span className="font-extrabold text-slate-800">UPIEdge</span>
                </p>
              </div>
            </div>
          )}
        </main>

        {/* Mobile Fixed Bottom Bar */}
        {!isPaid && mobileViewMode === 'apps' && (
          <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3 z-30 shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-slate-900 font-mono leading-tight">
                  ₹{amount.toFixed(2)}
                </div>
                <button
                  type="button"
                  onClick={() => setShowBreakup(!showBreakup)}
                  className="text-[11px] font-medium text-slate-500 hover:text-slate-800 transition"
                >
                  View Breakup
                </button>
              </div>
              <button
                type="button"
                onClick={handleMobilePayClick}
                className="px-8 py-2.5 rounded-md bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold text-xs shadow-xs transition active:scale-95"
              >
                Pay
              </button>
            </div>
          </div>
        )}
      </div>


      {/* ========================================================================= */}
      {/* 💻 2. DESKTOP WEB VIEW (Visible on >=md screens)                            */}
      {/* ========================================================================= */}
      <div className="hidden md:flex min-h-screen bg-[#eef0f3] items-center justify-center p-6">
        <div className="max-w-[960px] w-full bg-white rounded-lg border border-slate-200 shadow-sm p-6 relative">
          
          {onClose && (
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 inline-flex items-center justify-center p-0 transition active:scale-95 z-20 cursor-pointer shadow-2xs leading-none"
              title="Cancel & Exit"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5 shrink-0 block" />
            </button>
          )}

          {isPaid ? (
            /* Desktop Payment Success View */
            <div className="py-12 px-4 text-center space-y-4 animate-in fade-in-50 duration-200">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Payment Successful!</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Transaction verified directly with the merchant bank account.
              </p>
              <div className="inline-block p-4 rounded-md bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 space-y-1.5 text-left min-w-[280px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Order ID:</span>
                  <span className="font-bold text-slate-900">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Amount Paid:</span>
                  <span className="font-bold text-emerald-700">₹{amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className="font-bold text-emerald-600">COMPLETED</span>
                </div>
              </div>
              <div className="pt-2">
                {onClose && (
                  <button
                    onClick={onClose}
                    className="px-6 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition active:scale-95"
                  >
                    Return to Dashboard
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Desktop 3-Column Gateway Layout */
            <div className="grid grid-cols-12 gap-5 items-stretch">
              
              {/* Left Column: Calculation Box */}
              <div className="col-span-4 rounded-lg border border-slate-200 p-5 bg-white flex flex-col justify-between shadow-2xs min-h-[420px] h-full">
                <div className="space-y-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      <Layers className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-xs text-slate-900">
                      {payeeName}
                    </span>
                  </div>

                  <div className="rounded-md border border-slate-100 bg-[#f8fafc] p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Total :</span>
                      <span className="font-mono text-xs">₹{amount.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-slate-200/80" />
                    <div className="space-y-2 text-xs text-slate-500">
                      <div className="flex items-center justify-between">
                        <span>Subtotal</span>
                        <span className="font-mono font-medium text-slate-700">₹{amount.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Convenience Fee</span>
                        <span className="font-mono font-medium text-slate-700">₹0.00</span>
                      </div>
                    </div>
                    <div className="border-t border-slate-200/80" />
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900 pt-0.5">
                      <span>Grand Total</span>
                      <span className="font-mono text-xs">₹{amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 text-center border-t border-slate-100 mt-3">
                  <p className="text-[11px] text-slate-400 font-medium flex items-center justify-center gap-1.5">
                    <span>Powered by</span>
                    <span className="font-bold text-slate-900">UPIEdge</span>
                  </p>
                </div>
              </div>

              {/* Middle Column: Payment Options */}
              <div className="col-span-3 flex flex-col space-y-2 h-full">
                <h4 className="text-xs font-bold text-slate-900">Payment Options</h4>
                <div className="rounded-lg border border-slate-200 bg-white flex flex-col shadow-2xs overflow-hidden flex-1 min-h-[390px] h-full">
                  <div className="p-3 border-b border-slate-100">
                    <p className="text-[11px] text-slate-600 font-semibold">UPI Payment</p>
                  </div>
                  <div className="p-3 flex-1">
                    <div className="p-3 rounded-md bg-[#f5f3ff] border border-purple-200 flex items-center gap-3 shadow-2xs cursor-pointer hover:border-purple-300 transition">
                      <UpiQrIcon />
                      <div>
                        <h5 className="text-xs font-bold text-slate-900">UPI</h5>
                        <p className="text-[10px] text-slate-500 font-medium">Pay via UPI QR</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Scan QR View */}
              <div className="col-span-5 rounded-lg border border-slate-200 p-5 bg-white flex flex-col items-center justify-center text-center shadow-2xs min-h-[420px] h-full space-y-3.5">
                <div className="space-y-2.5 flex flex-col items-center w-full">
                  <h4 className="text-xs font-bold text-slate-900">Scan via any UPI app</h4>

                  <div className="flex items-center justify-center gap-2">
                    <PhonePeIcon size="sm" />
                    <GPayIcon size="sm" />
                    <PaytmIcon size="sm" />
                    <FreechargeIcon size="sm" />
                  </div>

                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    <QRCodeSVG
                      value={upiIntentString}
                      size={180}
                      level="M"
                      includeMargin={false}
                    />
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 bg-slate-100 px-4 py-1.5 rounded-full font-medium">
                  This QR will expire in <span className="font-mono font-bold text-slate-900">{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Breakup Modal */}
      {showBreakup && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-end justify-center p-0 md:hidden">
          <div className="bg-white rounded-t-lg border border-slate-200 shadow-2xl w-full p-5 space-y-4 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-xs font-bold text-slate-900">Payment Breakup</h4>
              <button onClick={() => setShowBreakup(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs text-slate-600 font-medium">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-slate-800">₹{amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Convenience Fee</span>
                <span className="font-mono text-emerald-600 font-bold">₹0.00 (FREE)</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between text-xs font-bold text-slate-900">
                <span>Grand Total</span>
                <span className="font-mono text-slate-900">₹{amount.toFixed(2)}</span>
              </div>
            </div>
            <button onClick={() => setShowBreakup(false)} className="w-full py-2.5 rounded-md bg-slate-900 text-white font-bold text-xs">
              Done
            </button>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xl max-w-xs w-full p-5 text-center space-y-3.5 animate-in fade-in-50 duration-150">
            <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">Cancel Payment?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to cancel this payment session?
              </p>
            </div>
            <div className="pt-1 grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="w-full py-2 rounded-md bg-slate-100 hover:bg-slate-200 font-bold text-xs text-slate-700 transition active:scale-95"
              >
                Continue
              </button>
              <button
                onClick={() => {
                  setShowCancelConfirm(false);
                  if (onClose) onClose();
                  else router.push('/user/dashboard');
                }}
                className="w-full py-2 rounded-md bg-rose-600 hover:bg-rose-700 font-bold text-xs text-white shadow-xs transition active:scale-95"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
