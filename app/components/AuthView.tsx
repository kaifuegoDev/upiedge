'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Eye, 
  EyeOff, 
  Layers,
  Mail,
  Lock,
  Smartphone,
  Building,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  QrCode
} from 'lucide-react';

interface AuthViewProps {
  initialMode?: 'login' | 'register';
  onAuthSuccess?: () => void;
}

export default function AuthView({
  initialMode = 'login',
  onAuthSuccess
}: AuthViewProps) {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [mobileNumber, setMobileNumber] = useState<string>('9876543210');
  const [email, setEmail] = useState<string>('merchant@upiedge.com');
  const [businessName, setBusinessName] = useState<string>('Alpha Store');
  const [password, setPassword] = useState<string>('••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (onAuthSuccess) {
        onAuthSuccess();
      } else {
        router.push('/user/dashboard');
      }
    }, 450);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onAuthSuccess) {
        onAuthSuccess();
      } else {
        router.push('/user/dashboard');
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Left Column: Pro Auth Form Card */}
      <div className="flex-1 flex flex-col justify-between px-6 sm:px-12 lg:px-16 py-10 max-w-xl mx-auto w-full bg-white lg:bg-transparent">
        {/* Top Header Logo */}
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 block leading-tight">
                UPIEdge
              </span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Payment Gateway
              </span>
            </div>
          </Link>

          <Link
            href="/landing"
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition flex items-center gap-1"
          >
            <span>Learn more</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Center Main Card Container */}
        <div className="my-auto py-8">
          <div className="bg-white lg:p-8 lg:rounded-2xl lg:border lg:border-slate-200/80 lg:shadow-xl lg:shadow-slate-200/40 space-y-6">
            {/* Title and Switcher */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  <span>Direct-to-Bank UPI V2.4</span>
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {mode === 'login' ? 'Welcome back' : 'Start accepting UPI'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                {mode === 'login' 
                  ? 'Sign in to access your merchant console and real-time settlements.' 
                  : 'Create a free merchant account with 0% platform fee and instant payouts.'}
              </p>
            </div>

            {/* Error banner if any */}
            {errorMessage && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Business / Store Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Building className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. My Digital Store"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5 transition"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="merchant@yourdomain.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5 transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Mobile Number (for Settlement Alerts)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3.5 py-2.5 text-xs font-medium font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5 transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    Password
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => alert('Password reset instructions sent to your email.')}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline transition"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-10 py-2.5 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-slate-600 font-medium">
                  <input
                    type="checkbox"
                    checked={keepLoggedIn}
                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                    className="w-4 h-4 text-slate-900 rounded border-slate-300 focus:ring-slate-800"
                  />
                  <span>Stay logged in on this browser</span>
                </label>
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition active:scale-[0.98] shadow-md shadow-slate-900/10 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </span>
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Sign in to Merchant Dashboard' : 'Create Merchant Account'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              {/* Quick Demo Access Button */}
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-semibold text-xs transition active:scale-[0.98] flex items-center justify-center gap-2 border border-slate-200/60"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Explore Live Demo (1-Click)</span>
              </button>
            </form>

            {/* Mode Switcher */}
            <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
              {mode === 'login' ? (
                <span>
                  New to UPIEdge?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('register'); setErrorMessage(null); }}
                    className="font-bold text-slate-900 hover:text-blue-600 underline underline-offset-2 transition"
                  >
                    Create an account
                  </button>
                </span>
              ) : (
                <span>
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('login'); setErrorMessage(null); }}
                    className="font-bold text-slate-900 hover:text-blue-600 underline underline-offset-2 transition"
                  >
                    Sign in here
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer Security Badges */}
        <div className="pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-Bit SSL Bank Grade Encryption</span>
          </div>
          <span>NPCI Direct UPI Forwarding</span>
        </div>
      </div>

      {/* Right Column: Pro Visual Showcase Panel (Desktop Only) */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-12 flex-col justify-between overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Zero MDR • 0% Transaction Cuts</span>
          </div>
          <span className="text-xs font-mono text-slate-400">upiedge.com</span>
        </div>

        {/* Center Dynamic Product Showcase Mockup */}
        <div className="relative z-10 my-auto space-y-6 max-w-md mx-auto w-full">
          {/* Realtime Live Transaction Notification Card */}
          <div className="p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>Payment Received</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                      +₹1,499.00
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    UTR: 421884920184 • Instant Bank Credit
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Just now</span>
            </div>

            {/* Live Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[11px] font-semibold text-slate-300">
                <span>Webhook Delivery</span>
                <span className="text-emerald-400 font-mono">HTTP 200 (42ms)</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" />
              </div>
            </div>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
              <div className="flex items-center gap-2 text-blue-400">
                <QrCode className="w-4 h-4" />
                <span className="text-xs font-bold text-white">Dynamic UPI QR</span>
              </div>
              <p className="text-[11px] text-slate-400">Amount-locked auto-reconciling QR for each customer order.</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
              <div className="flex items-center gap-2 text-emerald-400">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-bold text-white">Direct Bank Push</span>
              </div>
              <p className="text-[11px] text-slate-400">Money lands directly in your primary bank account instantly.</p>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/60 to-slate-900/60 border border-blue-500/20 text-xs text-slate-300 leading-relaxed italic">
            "We replaced traditional 2% gateway commissions with UPIEdge. All payments settle in real-time with automatic webhooks."
            <span className="block mt-1 font-bold text-white not-italic text-[11px]">
              — Verified Indian Merchant
            </span>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/10">
          <span>Trusted by 500+ Indian businesses & SaaS</span>
          <div className="flex items-center gap-4">
            <span>Paytm</span>
            <span>PhonePe</span>
            <span>GPay</span>
            <span>BHIM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
