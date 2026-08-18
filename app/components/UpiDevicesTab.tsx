'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  CheckCircle2, 
  RefreshCw, 
  Plus, 
  Store,
  X,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Mail,
  Lock,
  HelpCircle,
  Play,
  ExternalLink
} from 'lucide-react';
import { UpiDevice } from '../types';

import bharatpeImg from '../assets/bharatpe_merchants.png';
import freechargeImg from '../assets/freecharge.png';
import gpayImg from '../assets/gpay_merchants.png';
import paytmImg from '../assets/paytm_business.png';
import bhimImg from '../assets/bhim (1).jpg';
import fampayImg from '../assets/images.png';

interface UpiDevicesTabProps {
  devices?: UpiDevice[];
  setDevices?: React.Dispatch<React.SetStateAction<UpiDevice[]>>;
  listenerConnected?: boolean;
  setListenerConnected?: (connected: boolean) => void;
}

interface MerchantProvider {
  id: string;
  name: string;
  category: 'General Merchant' | 'Direct Bank' | 'Direct Wallet' | 'Special Merchant' | 'Star Merchant';
  badge?: string;
  badgeType?: 'recommended' | 'enterprise' | 'maintenance';
  isMaintenance?: boolean;
  iconType: 'hdfc' | 'paytm' | 'phonepe' | 'freecharge' | 'bharatpe' | 'quintus' | 'yono' | 'gpay' | 'fampay' | 'bhim';
  placeholderVpa: string;
  youtubeVideoId: string;
  youtubeVideoTitle: string;
}

const DEMO_VIDEO_ID = 'M7lc1UVf-VE';

const GENERAL_MERCHANTS: MerchantProvider[] = [
  {
    id: 'paytm_business',
    name: 'Paytm For Business',
    category: 'General Merchant',
    badge: 'Coming Soon',
    badgeType: 'maintenance',
    isMaintenance: true,
    iconType: 'paytm',
    placeholderVpa: '9876543210@paytm',
    youtubeVideoId: DEMO_VIDEO_ID,
    youtubeVideoTitle: 'How to Connect Paytm Business to Gateway'
  },
  {
    id: 'bhim_upi',
    name: 'UPI',
    category: 'Direct Bank',
    iconType: 'bhim',
    placeholderVpa: 'example@upi',
    youtubeVideoId: DEMO_VIDEO_ID,
    youtubeVideoTitle: 'How to Connect UPI ID & Email'
  },
  {
    id: 'freecharge_direct',
    name: 'Freecharge',
    category: 'Direct Bank',
    iconType: 'freecharge',
    placeholderVpa: '9876543210@freecharge',
    youtubeVideoId: DEMO_VIDEO_ID,
    youtubeVideoTitle: 'How to Connect Freecharge Merchant Session'
  },
  {
    id: 'fampay_merchant',
    name: 'FamPay',
    category: 'Direct Wallet',
    iconType: 'fampay',
    placeholderVpa: 'username@fam',
    youtubeVideoId: DEMO_VIDEO_ID,
    youtubeVideoTitle: 'How to Connect FamPay Email & Wallet Sync'
  },
];

const SPECIAL_MERCHANTS: MerchantProvider[] = [
  {
    id: 'bharatpe_merchant',
    name: 'BharatPe For Merchants',
    category: 'Special Merchant',
    iconType: 'bharatpe',
    placeholderVpa: '9876543210@bharatpe',
    youtubeVideoId: DEMO_VIDEO_ID,
    youtubeVideoTitle: 'How to Connect BharatPe Merchant Account'
  },
  {
    id: 'gpay_business',
    name: 'GPay For Business',
    category: 'Star Merchant',
    iconType: 'gpay',
    placeholderVpa: 'business@okaxis',
    youtubeVideoId: DEMO_VIDEO_ID,
    youtubeVideoTitle: 'How to Connect Google Pay For Business'
  },
];

const COMMON_HANDLES = ['@paytm', '@ybl', '@okhdfcbank', '@upi'];

export default function UpiDevicesTab({}: UpiDevicesTabProps) {
  const [inputVpa, setInputVpa] = useState('');
  
  // Selected merchant provider for Connection Form Modal
  const [selectedProvider, setSelectedProvider] = useState<MerchantProvider | null>(null);
  
  // Separate Dedicated Video Tutorial Modal
  const [videoModalProvider, setVideoModalProvider] = useState<MerchantProvider | null>(null);

  const [providerMobile, setProviderMobile] = useState('');
  const [providerEmail, setProviderEmail] = useState('');
  const [providerOtp, setProviderOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLinking, setIsLinking] = useState(false);
  const [providerConnectedMsg, setProviderConnectedMsg] = useState<string | null>(null);

  const handleOpenConnect = (provider: MerchantProvider) => {
    setSelectedProvider(provider);
    setVideoModalProvider(null);
    setOtpSent(false);
    setProviderMobile('');
    setProviderEmail('');
    setProviderOtp('');
  };

  const handleOpenVideoTutorial = (provider: MerchantProvider) => {
    setSelectedProvider(null);
    setVideoModalProvider(provider);
  };

  const handleAddSuffix = (suffix: string) => {
    if (inputVpa.includes('@')) {
      const prefix = inputVpa.split('@')[0];
      setInputVpa(prefix + suffix);
    } else {
      setInputVpa(inputVpa + suffix);
    }
  };

  const handleConnectDirectUpi = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanVpa = inputVpa.trim().toLowerCase();
    if (!cleanVpa || !cleanVpa.includes('@')) {
      alert('Please enter a valid UPI ID (e.g. yourname@upi)');
      return;
    }
    if (!providerEmail || !providerEmail.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    setIsLinking(true);
    setTimeout(() => {
      setIsLinking(false);
      setSelectedProvider(null);
      setInputVpa('');
      setProviderEmail('');
      setProviderConnectedMsg(`UPI ID (${cleanVpa}) and email (${providerEmail}) connected successfully!`);
      setTimeout(() => setProviderConnectedMsg(null), 4000);
    }, 600);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProvider?.id === 'fampay_merchant') {
      if (!providerEmail || !providerEmail.includes('@')) {
        alert('Please enter a valid email address linked with FamPay');
        return;
      }
    } else {
      if (!providerMobile || providerMobile.length < 10) {
        alert('Please enter a valid 10-digit mobile number');
        return;
      }
    }
    setIsLinking(true);
    setTimeout(() => {
      setIsLinking(false);
      setOtpSent(true);
    }, 600);
  };

  const handleVerifyProvider = (e: React.FormEvent) => {
    e.preventDefault();
    if (!providerOtp || providerOtp.length < 4) {
      alert('Please enter valid OTP');
      return;
    }
    setIsLinking(true);
    setTimeout(() => {
      setIsLinking(false);
      const connectedName = selectedProvider?.name || 'Merchant';
      setSelectedProvider(null);
      setOtpSent(false);
      setProviderMobile('');
      setProviderEmail('');
      setProviderOtp('');
      setProviderConnectedMsg(`${connectedName} connected successfully with 24/7 cloud sync!`);
      setTimeout(() => setProviderConnectedMsg(null), 4000);
    }, 800);
  };

  // Helper to render provider logo
  const renderProviderIcon = (type: MerchantProvider['iconType']) => {
    switch (type) {
      case 'paytm':
        return (
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-md bg-white border border-slate-200 shrink-0 shadow-2xs overflow-hidden flex items-center justify-center">
            <Image src={paytmImg} alt="Paytm for Business" className="w-full h-full object-cover" />
          </div>
        );
      case 'bhim':
        return (
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-md bg-white border border-slate-200 shrink-0 shadow-2xs overflow-hidden flex items-center justify-center">
            <Image src={bhimImg} alt="UPI" className="w-full h-full object-cover" />
          </div>
        );
      case 'freecharge':
        return (
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-md bg-white border border-slate-200 shrink-0 shadow-2xs overflow-hidden flex items-center justify-center">
            <Image src={freechargeImg} alt="Freecharge" className="w-full h-full object-cover" />
          </div>
        );
      case 'bharatpe':
        return (
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-md bg-white border border-slate-200 shrink-0 shadow-2xs overflow-hidden flex items-center justify-center">
            <Image src={bharatpeImg} alt="BharatPe for Merchants" className="w-full h-full object-cover" />
          </div>
        );
      case 'fampay':
        return (
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-md bg-white border border-slate-200 shrink-0 shadow-2xs overflow-hidden flex items-center justify-center">
            <Image src={fampayImg} alt="FamPay" className="w-full h-full object-cover" />
          </div>
        );
      case 'gpay':
        return (
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-md bg-white border border-slate-200 shrink-0 shadow-2xs overflow-hidden flex items-center justify-center">
            <Image src={gpayImg} alt="GPay for Business" className="w-full h-full object-cover" />
          </div>
        );
      default:
        return <Store className="w-7 h-7 text-slate-700" />;
    }
  };

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto font-sans">
      {/* 1. Header Section */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Connect Merchant</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Select and link your UPI VPA or merchant business account to receive instant direct settlements.
        </p>
      </div>

      {providerConnectedMsg && (
        <div className="px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2.5 animate-in fade-in duration-200 shadow-2xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{providerConnectedMsg}</span>
        </div>
      )}

      {/* 2. Connect Merchant Providers Section */}
      <div className="space-y-6">
        
        {/* General Merchants Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {GENERAL_MERCHANTS.map((provider) => (
            <div
              key={provider.id}
              className="p-4 sm:p-4.5 rounded-lg bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-xs transition flex flex-col justify-between gap-3 relative group"
            >
              {/* Badge */}
              {provider.badge && (
                <span
                  className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-bold tracking-tight ${
                    provider.badgeType === 'maintenance'
                      ? 'bg-slate-900 text-white'
                      : provider.badgeType === 'recommended'
                      ? 'bg-teal-700 text-white'
                      : 'bg-teal-600 text-white'
                  }`}
                >
                  {provider.badge}
                </span>
              )}

              <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                {renderProviderIcon(provider.iconType)}
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                    {provider.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {provider.category}
                  </p>
                </div>
              </div>

              {/* Bottom Card Action: Only How to connect & Connect are clickable */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                <button
                  type="button"
                  onClick={() => handleOpenVideoTutorial(provider)}
                  className="text-slate-500 hover:text-blue-600 font-medium flex items-center gap-1 transition cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>How to connect?</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenConnect(provider)}
                  className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-0.5 hover:translate-x-0.5 transition cursor-pointer"
                >
                  <span>{provider.isMaintenance ? 'View Status' : 'Connect'}</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Section Divider: Special & Star Merchant */}
        <div className="relative flex items-center justify-center py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200/80" />
          </div>
          <div className="relative bg-[#f8fafc] px-4 text-xs font-semibold text-slate-500">
            Special & Star Merchant
          </div>
        </div>

        {/* Special & Star Merchants Grid (2 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {SPECIAL_MERCHANTS.map((provider) => (
            <div
              key={provider.id}
              className="p-4 sm:p-4.5 rounded-lg bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-xs transition flex flex-col justify-between gap-3 group"
            >
              <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                {renderProviderIcon(provider.iconType)}
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                    {provider.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {provider.category}
                  </p>
                </div>
              </div>

              {/* Bottom Card Action: Only How to connect & Connect are clickable */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                <button
                  type="button"
                  onClick={() => handleOpenVideoTutorial(provider)}
                  className="text-slate-500 hover:text-blue-600 font-medium flex items-center gap-1 transition cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>How to connect?</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenConnect(provider)}
                  className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-0.5 hover:translate-x-0.5 transition cursor-pointer"
                >
                  <span>Connect</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 1. SEPARATE DEDICATED YOUTUBE VIDEO TUTORIAL MODAL                        */}
      {/* ========================================================================= */}
      {videoModalProvider && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-2xl sm:max-w-3xl w-full p-4 sm:p-6 space-y-4 animate-in zoom-in-95 duration-150">
            {/* Video Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                {renderProviderIcon(videoModalProvider.iconType)}
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">{videoModalProvider.name} — Video Tutorial</h3>
                  <p className="text-xs text-slate-500">Step-by-step setup walkthrough</p>
                </div>
              </div>
              <button
                onClick={() => setVideoModalProvider(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 16:9 YouTube Video Embed Player */}
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black select-none">
              <iframe
                className="absolute -top-[2px] -left-[2px] w-[calc(100%+4px)] h-[calc(100%+4px)] block border-0 outline-none"
                style={{ border: 'none', outline: 'none' }}
                src={`https://www.youtube.com/embed/${videoModalProvider.youtubeVideoId}?autoplay=1&rel=0`}
                title={videoModalProvider.youtubeVideoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Footer Info & Actions */}
            <div className="flex items-center justify-between pt-1">
              <a
                href={`https://www.youtube.com/watch?v=${videoModalProvider.youtubeVideoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1.5 font-medium transition"
              >
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => handleOpenConnect(videoModalProvider)}
                className="px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition active:scale-95 shadow-xs flex items-center gap-1.5"
              >
                <span>Proceed to Connect</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. DIRECT CONNECTION FORM MODAL                                           */}
      {/* ========================================================================= */}
      {selectedProvider && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                {renderProviderIcon(selectedProvider.iconType)}
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{selectedProvider.name}</h3>
                  <p className="text-xs text-slate-500">
                    {selectedProvider.isMaintenance 
                      ? 'Coming Soon' 
                      : selectedProvider.id === 'bhim_upi' 
                      ? 'Direct Bank UPI Handle' 
                      : `${selectedProvider.category} • 24/7 Cloud Sync`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedProvider(null);
                  setOtpSent(false);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Case: Coming Soon */}
            {selectedProvider.isMaintenance ? (
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 space-y-2">
                <p className="font-bold flex items-center gap-2 text-slate-900">
                  <span className="w-2 h-2 rounded-full bg-slate-900 animate-pulse" />
                  <span>Integration Coming Soon</span>
                </p>
                <p className="text-[12px] text-slate-600 leading-relaxed">
                  {selectedProvider.name} integration is launching soon. In the meantime, you can connect and receive instant payments using <strong>UPI</strong>, <strong>Freecharge</strong>, or <strong>FamPay</strong>.
                </p>
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedProvider(null)}
                    className="px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition shadow-xs"
                  >
                    Got it
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Modal Info Banner */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <p className="font-bold flex items-center gap-1.5 text-slate-900">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Direct Bank Settlement</span>
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {selectedProvider.id === 'bhim_upi'
                      ? 'Enter your merchant UPI VPA handle. Payments will credit directly to your bank account with 0% gateway fees.'
                      : 'Transactions settle directly into your bank with instant UTR reconciliation without requiring your phone to be on.'}
                  </p>
                </div>

                {/* CASE A: UPI PROVIDER -> DIRECT UPI ID & EMAIL ENTRY FORM */}
                {selectedProvider.id === 'bhim_upi' ? (
                  <form onSubmit={handleConnectDirectUpi} className="space-y-4">
                    {/* Field 1: Merchant UPI ID */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-700">
                        Merchant UPI ID <span className="text-rose-500">*</span>
                      </label>

                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Store className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          required
                          value={inputVpa}
                          onChange={(e) => setInputVpa(e.target.value)}
                          placeholder="example@upi"
                          className="w-full bg-white border border-slate-200 rounded-md pl-9 pr-3.5 py-2 text-xs font-mono font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition shadow-2xs"
                        />
                      </div>

                      {/* Quick Suffix Presets */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        <span className="text-[11px] text-slate-400 font-medium mr-1">Presets:</span>
                        {COMMON_HANDLES.map((suffix) => (
                          <button
                            key={suffix}
                            type="button"
                            onClick={() => handleAddSuffix(suffix)}
                            className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-mono font-medium transition active:scale-95 border border-slate-200/60"
                          >
                            {suffix}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Field 2: Bank / Notification Email */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-700">
                        Bank / Notification Email <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          required
                          value={providerEmail}
                          onChange={(e) => setProviderEmail(e.target.value)}
                          placeholder="e.g. merchant@gmail.com"
                          className="w-full bg-white border border-slate-200 rounded-md pl-9 pr-3.5 py-2 text-xs font-mono font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition shadow-2xs"
                        />
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Email address for instant payment settlement receipts and webhook notifications.
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => handleOpenVideoTutorial(selectedProvider)}
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Watch Tutorial</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedProvider(null);
                            setInputVpa('');
                            setProviderEmail('');
                          }}
                          className="px-3.5 py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isLinking}
                          className="px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition active:scale-95 disabled:opacity-50 flex items-center gap-1.5 shadow-xs"
                        >
                          {isLinking ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Connecting UPI Gateway...</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Connect UPI ID</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  /* CASE B: CLOUD PROVIDERS -> MOBILE / EMAIL + OTP FLOW */
                  !otpSent ? (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          {selectedProvider.id === 'fampay_merchant'
                            ? 'Registered Email linked with FamPay'
                            : 'Registered Merchant Mobile Number'}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            {selectedProvider.id === 'fampay_merchant' ? (
                              <Mail className="w-4 h-4" />
                            ) : (
                              <Smartphone className="w-4 h-4" />
                            )}
                          </div>
                          {selectedProvider.id === 'fampay_merchant' ? (
                            <input
                              type="email"
                              required
                              value={providerEmail}
                              onChange={(e) => setProviderEmail(e.target.value)}
                              placeholder="e.g. name@gmail.com"
                              className="w-full bg-white border border-slate-200 rounded-md pl-9 pr-3 py-2 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                            />
                          ) : (
                            <input
                              type="tel"
                              required
                              maxLength={10}
                              value={providerMobile}
                              onChange={(e) => setProviderMobile(e.target.value.replace(/\D/g, ''))}
                              placeholder="e.g. 9876543210"
                              className="w-full bg-white border border-slate-200 rounded-md pl-9 pr-3 py-2 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                            />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {selectedProvider.id === 'fampay_merchant'
                            ? 'Enter the email address registered with your FamPay wallet account.'
                            : `Enter the mobile number linked with your ${selectedProvider.name} account.`}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <button
                          type="button"
                          onClick={() => handleOpenVideoTutorial(selectedProvider)}
                          className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Watch Tutorial</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedProvider(null);
                              setProviderEmail('');
                              setProviderMobile('');
                            }}
                            className="px-3.5 py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isLinking}
                            className="px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
                          >
                            {isLinking ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                <span>Sending OTP...</span>
                              </>
                            ) : (
                              <>
                                <span>Get Verification OTP</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    /* Step 2: OTP Verification */
                    <form onSubmit={handleVerifyProvider} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          {selectedProvider.id === 'fampay_merchant'
                            ? `Enter 6-Digit OTP sent to ${providerEmail}`
                            : `Enter 6-Digit OTP sent to +91 ${providerMobile}`}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Lock className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            required
                            maxLength={6}
                            value={providerOtp}
                            onChange={(e) => setProviderOtp(e.target.value.replace(/\D/g, ''))}
                            placeholder="• • • • • •"
                            className="w-full bg-white border border-slate-200 rounded-md pl-9 pr-3 py-2 text-sm font-mono font-bold text-center tracking-widest text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <button
                          type="button"
                          onClick={() => setOtpSent(false)}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          {selectedProvider.id === 'fampay_merchant' ? 'Change Email' : 'Change Number'}
                        </button>
                        <button
                          type="submit"
                          disabled={isLinking}
                          className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition active:scale-95 disabled:opacity-50 flex items-center gap-1.5 shadow-xs"
                        >
                          {isLinking ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Verifying...</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Link & Activate Gateway</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
