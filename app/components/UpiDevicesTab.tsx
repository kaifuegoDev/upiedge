import React, { useState } from 'react';
import { 
  Trash2, 
  CheckCircle2, 
  RefreshCw, 
  Info 
} from 'lucide-react';
import { UpiDevice } from '../types';

interface ConnectedUpiItem {
  id: string;
  vpa: string;
  isPrimary: boolean;
}

interface UpiDevicesTabProps {
  devices?: UpiDevice[];
  setDevices?: React.Dispatch<React.SetStateAction<UpiDevice[]>>;
  listenerConnected?: boolean;
  setListenerConnected?: (connected: boolean) => void;
}

export default function UpiDevicesTab({}: UpiDevicesTabProps) {
  const [upiList, setUpiList] = useState<ConnectedUpiItem[]>([
    {
      id: 'upi_01',
      vpa: 'example@upi',
      isPrimary: true
    },
    {
      id: 'upi_02',
      vpa: 'store@upi',
      isPrimary: false
    },
    {
      id: 'upi_03',
      vpa: 'merchant@upi',
      isPrimary: false
    }
  ]);

  const [inputVpa, setInputVpa] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSetPrimary = (upiId: string) => {
    setUpiList(prev => prev.map(m => ({
      ...m,
      isPrimary: m.id === upiId
    })));
  };

  const handleDeleteUpi = (upiId: string) => {
    if (confirm('Are you sure you want to delete this UPI ID?')) {
      setUpiList(prev => prev.filter(m => m.id !== upiId));
    }
  };

  const handleAddUpi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVpa.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const created: ConnectedUpiItem = {
        id: 'upi_' + Date.now().toString().slice(-4),
        vpa: inputVpa.trim(),
        isPrimary: upiList.length === 0
      };

      setUpiList(prev => [created, ...prev]);
      setIsSubmitting(false);
      setInputVpa('');
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    }, 400);
  };

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Connected UPI ID</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Enter Merchant UPI to Generate QR Code
        </p>
      </div>

      {/* Amber Information Banner */}
      <div className="p-3.5 rounded-lg bg-[#fef3c7] border border-[#fde68a] text-xs text-[#92400e] flex items-center gap-2.5 shadow-2xs">
        <div className="w-4 h-4 rounded-full bg-[#d97706] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
          i
        </div>
        <p className="font-medium text-xs">
          The UPI ID will be used to generate QR code. Please make sure to enter correct UPI ID.
        </p>
      </div>

      {/* Add UPI ID Form Card */}
      <div className="p-6 rounded-lg bg-white border border-slate-200 shadow-xs">
        <form onSubmit={handleAddUpi} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              UPI ID<span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={inputVpa}
              onChange={(e) => setInputVpa(e.target.value)}
              placeholder="example@upi"
              className="w-full bg-white border border-slate-200 rounded-md px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-md bg-[#006241] hover:bg-[#004d34] text-white font-semibold text-xs shadow-xs transition active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Adding UPI ID...</span>
              </>
            ) : (
              <span>Add UPI ID</span>
            )}
          </button>

          {successMsg && (
            <div className="p-2.5 rounded-md bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>UPI ID connected successfully!</span>
            </div>
          )}
        </form>
      </div>

      {/* Active Connected UPI Handles List */}
      <div className="p-6 rounded-lg bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Active Connected UPI Handles</h3>
            <p className="text-xs text-slate-500">Routing dynamic QR payments directly into your bank</p>
          </div>
          <span className="text-xs text-slate-500 font-semibold">{upiList.length} Accounts Linked</span>
        </div>

        <div className="space-y-2.5">
          {upiList.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50/50 flex items-center justify-between gap-4 transition"
            >
              {/* Left: UPI ID + Primary Badge */}
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-xs font-mono font-bold text-slate-900">{item.vpa}</span>
                {item.isPrimary && (
                  <span className="text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded shadow-2xs">
                    Primary
                  </span>
                )}
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {!item.isPrimary && (
                  <button
                    onClick={() => handleSetPrimary(item.id)}
                    className="px-3 py-1 rounded-md bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition"
                  >
                    Make Primary
                  </button>
                )}

                <button
                  onClick={() => handleDeleteUpi(item.id)}
                  className="p-1.5 rounded-md hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-transparent hover:border-rose-200 transition"
                  title="Delete UPI ID"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
