'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ShieldCheck, 
  Zap, 
  Check, 
  ArrowRight, 
  Code, 
  Smartphone, 
  Lock, 
  Server, 
  ChevronRight, 
  Copy, 
  ExternalLink,
  Sparkles,
  TrendingUp,
  Percent,
  Layers,
  ArrowUpRight,
  Headphones,
  CheckCircle2,
  Terminal,
  QrCode
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface LandingPageProps {
  onOpenDashboard?: () => void;
}

export default function LandingPage({ onOpenDashboard }: LandingPageProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedLang, setSelectedLang] = useState<'curl' | 'node' | 'python' | 'php'>('curl');
  const [copiedCode, setCopiedCode] = useState(false);
  const [demoAmount, setDemoAmount] = useState<number>(499);
  const [demoVpa, setDemoVpa] = useState<string>('merchant@upi');

  const codeSnippets = {
    curl: `curl -X POST https://api.upiedge.com/v1/order/create \\
  -H "Authorization: Bearer sec_live_9f82ab47e" \\
  -H "Content-Type: application/json" \\
  -d '{
    "order_id": "ORD_${demoAmount}001",
    "amount": ${demoAmount}.00,
    "customer_phone": "+919876543210",
    "vpa": "${demoVpa}",
    "webhook_url": "https://yourdomain.com/api/webhook"
  }'`,
    node: `import { UPIEdge } from '@upiedge/sdk';

const upi = new UPIEdge({ apiKey: process.env.UPIEDGE_SECRET_KEY });

const order = await upi.orders.create({
  orderId: 'ORD_${demoAmount}001',
  amount: ${demoAmount}.00,
  customerPhone: '+919876543210',
  vpa: '${demoVpa}',
  webhookUrl: 'https://yourdomain.com/api/webhook'
});

console.log('Payment QR Intent:', order.intentUrl);`,
    python: `from upiedge import UPIEdge

client = UPIEdge(api_key="sec_live_9f82ab47e")

order = client.orders.create(
    order_id="ORD_${demoAmount}001",
    amount=${demoAmount}.00,
    customer_phone="+919876543210",
    vpa="${demoVpa}",
    webhook_url="https://yourdomain.com/api/webhook"
)

print("Payment Intent URL:", order.intent_url)`,
    php: `<?php
require_once 'vendor/autoload.php';

$upiedge = new \\UPIEdge\\Client('sec_live_9f82ab47e');

$order = $upiedge->orders->create([
    'order_id' => 'ORD_${demoAmount}001',
    'amount' => ${demoAmount}.00,
    'customer_phone' => '+919876543210',
    'vpa' => '${demoVpa}',
    'webhook_url' => 'https://yourdomain.com/api/webhook'
]);

echo $order->intent_url;`
  };

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(codeSnippets[selectedLang]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const pricingTiers = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Ideal for early indie builders testing UPI checkouts.',
      priceMonthly: 0,
      priceYearly: 0,
      popular: false,
      features: [
        'Up to 100 Transactions / month',
        '1 Active UPI Merchant ID',
        'Direct-to-Bank Settlements',
        'Community Discord Support',
        '0% Gateway Cut'
      ]
    },
    {
      id: 'basic',
      name: 'Basic Merchant',
      description: 'Perfect for single brand stores with regular transactions.',
      priceMonthly: 299,
      priceYearly: 2990,
      popular: false,
      features: [
        'Up to 1,500 Transactions / month',
        '2 Active UPI Merchant IDs',
        'Live Webhook Event Notifications',
        'Standard Email Support',
        '0% Gateway Cut'
      ]
    },
    {
      id: 'pro',
      name: 'Pro Subscription',
      description: 'Best for growing SaaS, digital services & high traffic shops.',
      priceMonthly: 699,
      priceYearly: 6990,
      popular: true,
      features: [
        'Up to 5,000 Transactions / month',
        '5 Active UPI Merchant IDs',
        'Smart Automatic Device Rotation',
        'Custom Brand Checkout Theme',
        'Priority Telegram Support',
        '0% Gateway Cut'
      ]
    },
    {
      id: 'business',
      name: 'Business',
      description: 'High volume enterprises requiring zero throttling.',
      priceMonthly: 1499,
      priceYearly: 14990,
      popular: false,
      features: [
        'Up to 20,000 Transactions / month',
        '15 Active UPI Merchant IDs',
        'Multi-Bank Account Load Balancing',
        'Dedicated Technical Account Manager',
        '0% Gateway Cut'
      ]
    },
    {
      id: 'scale',
      name: 'Scale Merchant',
      description: 'Rapidly scaling applications with round-the-clock volume.',
      priceMonthly: 2499,
      priceYearly: 24990,
      popular: false,
      features: [
        'Up to 50,000 Transactions / month',
        'Unlimited UPI Merchant Devices',
        'Sub-second Webhook Dispatch Engine',
        'Custom Domain Checkout Integration',
        '0% Gateway Cut'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Custom infrastructure for limitless scale.',
      priceMonthly: 4999,
      priceYearly: 49990,
      popular: false,
      features: [
        'Unlimited Monthly Transactions',
        'Unlimited UPI Merchant Devices',
        'Self-Hosted On-Premises Option',
        'Direct Bank API Webhook Engine',
        'Custom SLA & 99.99% Uptime Guarantee',
        '0% Gateway Cut'
      ]
    }
  ];

  const handleNavClick = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const upiIntent = `upi://pay?pa=${encodeURIComponent(demoVpa)}&pn=UPIEdge%20Merchant&am=${demoAmount.toFixed(2)}&cu=INR&tr=ORD_${demoAmount}001&tn=Demo%20Live%20Checkout`;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* ---------------------------------------------------- */}
      {/* 1. STICKY HEADER NAVIGATION                          */}
      {/* ---------------------------------------------------- */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-sm text-white">
              <Layers className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              UPIEdge
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <button onClick={() => handleNavClick('features')} className="hover:text-blue-600 transition">Features</button>
            <button onClick={() => handleNavClick('demo')} className="hover:text-blue-600 transition">Live Demo</button>
            <button onClick={() => handleNavClick('pricing')} className="hover:text-blue-600 transition">Pricing</button>
            <button onClick={() => handleNavClick('developers')} className="hover:text-blue-600 transition">API & Docs</button>
            <button onClick={() => handleNavClick('faq')} className="hover:text-blue-600 transition">FAQ</button>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-900 transition"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition active:scale-95 flex items-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------- */}
      {/* 2. HERO SECTION                                      */}
      {/* ---------------------------------------------------- */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-36 overflow-hidden border-b border-slate-100">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/8 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-bold shadow-2xs">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Zero Commission • Direct-to-Bank Gateway</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 tracking-tight leading-[1.08]">
                Accept UPI Payments <br />
                <span className="text-blue-600">With 0% Transaction Cut</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Stop losing 2-3% on every checkout. UPIEdge lets you accept direct customer payments right into your merchant bank account with automated instant webhook notifications.
              </p>

              {/* CTA Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/register"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/25 transition active:scale-95 flex items-center justify-center gap-2.5"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => handleNavClick('demo')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm sm:text-base border border-slate-200 transition active:scale-95 flex items-center justify-center gap-2.5"
                >
                  <QrCode className="w-4 h-4 text-slate-600" />
                  <span>Try Live Sandbox</span>
                </button>
              </div>

              {/* Social Trust Metrics */}
              <div className="pt-8 grid grid-cols-3 gap-6 border-t border-slate-100 max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">0%</div>
                  <div className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">Gateway Fees</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">Instant</div>
                  <div className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">Direct Settlement</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">99.98%</div>
                  <div className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">Uptime SLA</div>
                </div>
              </div>
            </div>

            {/* Hero Right Mockup Floating Checkout */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl shadow-slate-200/60 space-y-5 relative">
                {/* Top status bar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-bold shadow-xs">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-slate-900 block leading-tight">UPI Instant Checkout</span>
                      <span className="text-xs text-slate-400 font-mono">Order #ORD_902810</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Direct Pay
                  </span>
                </div>

                {/* Amount Display */}
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">Amount Due</span>
                    <span className="text-xs text-emerald-600 font-semibold">0% Gateway Convenience Fee</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">₹499.00</div>
                </div>

                {/* Dynamic QR Box */}
                <div className="p-5 bg-white rounded-xl border border-slate-200 flex flex-col items-center justify-center shadow-xs space-y-4 text-center">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                    <QRCodeSVG value={upiIntent} size={170} level="M" />
                  </div>
                  
                  {/* Supported UPI Apps Badges */}
                  <div className="flex items-center justify-center gap-2 pt-1">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#5f259f] text-white">PhonePe</span>
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-white text-slate-700 border border-slate-200 shadow-2xs">GPay</span>
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#002e6e] text-white">Paytm</span>
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-900 text-white">BHIM</span>
                  </div>
                </div>

                {/* Secure Trust Footer */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-medium">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Direct-to-Bank Settlement</span>
                  </div>
                  <span className="font-mono text-slate-400 font-semibold">Valid: 09:42</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. SUPPORTED UPI APPS & ECOSYSTEM                    */}
      {/* ---------------------------------------------------- */}
      <section className="py-14 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">
            Works with 100+ UPI Apps & All Major Indian Banks
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-80 hover:opacity-100 transition-all duration-300">
            <span className="text-base sm:text-lg font-extrabold text-slate-800 tracking-tight">PhonePe</span>
            <span className="text-base sm:text-lg font-extrabold text-slate-800 tracking-tight">Google Pay</span>
            <span className="text-base sm:text-lg font-extrabold text-slate-800 tracking-tight">Paytm UPI</span>
            <span className="text-base sm:text-lg font-extrabold text-slate-800 tracking-tight">BHIM NPCI</span>
            <span className="text-base sm:text-lg font-extrabold text-slate-800 tracking-tight">HDFC Bank</span>
            <span className="text-base sm:text-lg font-extrabold text-slate-800 tracking-tight">ICICI Bank</span>
            <span className="text-base sm:text-lg font-extrabold text-slate-800 tracking-tight">SBI UPI</span>
            <span className="text-base sm:text-lg font-extrabold text-slate-800 tracking-tight">Cred UPI</span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. CORE FEATURES & ADVANTAGES                        */}
      {/* ---------------------------------------------------- */}
      <section id="features" className="py-24 md:py-32 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-wider">Built For Scale & Freedom</h2>
            <h3 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Why High-Growth Businesses Choose UPIEdge
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Traditional payment gateways hold your money in escrow, charge 2-3% cuts, and block your account without notice. UPIEdge brings back full autonomy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Feature 1 */}
            <div className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Percent className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">0% Commission Cut</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every rupee paid by your customer goes directly into your bank account. No deductions, no hidden processing fees.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Instant Settlements (T+0)</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Zero waiting for T+2 settlement cycles. Funds land instantly in your bank UPI ID the moment the customer scans.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Server className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Real-Time Webhooks</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Automated listeners detect incoming bank notifications and trigger signed HMAC webhooks in &lt;1.5 seconds.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Smart Device Auto-Rotation</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Connect multiple merchant devices (PhonePe, GPay, Paytm, BHIM) and auto-rotate handles to prevent daily bank limit caps.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Zero Custody Risk</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                UPIEdge never touches or holds merchant money in escrow. There is zero risk of sudden account freezes or fund withholdings.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Code className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Simple REST API & SDKs</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Integrate in under 15 minutes with comprehensive SDKs for Node.js, Python, PHP, Laravel, and WordPress WooCommerce.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. INTERACTIVE LIVE QR DEMO SANDBOX                  */}
      {/* ---------------------------------------------------- */}
      <section id="demo" className="py-24 md:py-32 bg-[#f8fafc] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-wider">Interactive Playground</h2>
            <h3 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Test Dynamic UPI QR Generation
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Enter any amount and merchant UPI handle below to generate a live, scannable payment intent in real-time.
            </p>
          </div>

          <div className="max-w-3xl mx-auto rounded-2xl border border-slate-200 bg-white p-7 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Controls */}
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-bold text-slate-700">
                      Payment Amount (₹ INR)
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[199, 499, 999, 1999].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setDemoAmount(amt)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition ${
                            demoAmount === amt
                              ? 'bg-slate-900 text-white'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                          }`}
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <input
                    type="number"
                    value={demoAmount}
                    onChange={(e) => setDemoAmount(Math.max(1, Number(e.target.value)))}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5 shadow-2xs"
                    placeholder="499"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-bold text-slate-700">
                      Destination Merchant UPI ID
                    </label>
                  </div>
                  <input
                    type="text"
                    value={demoVpa}
                    onChange={(e) => setDemoVpa(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5 shadow-2xs"
                    placeholder="example@upi"
                  />
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {['@okhdfcbank', '@paytm', '@okaxis', '@ybl', '@upi'].map((suffix) => (
                      <button
                        key={suffix}
                        type="button"
                        onClick={() => {
                          const prefix = demoVpa.includes('@') ? demoVpa.split('@')[0] : demoVpa;
                          setDemoVpa((prefix || 'merchant') + suffix);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-mono font-semibold transition"
                      >
                        {suffix}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-1.5">
                  <p className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Real Dynamic UPI Intent</span>
                  </p>
                  <p className="text-xs text-slate-500 font-mono break-all leading-relaxed">
                    {upiIntent}
                  </p>
                </div>
              </div>

              {/* Result Preview Card */}
              <div className="flex flex-col items-center justify-center p-7 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-4">
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <QRCodeSVG value={upiIntent} size={165} level="M" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">₹{demoAmount.toFixed(2)}</div>
                  <p className="text-xs text-slate-500 font-medium mt-1">Scan with any UPI App to test</p>
                </div>
                <a
                  href={upiIntent}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition active:scale-95 flex items-center gap-2 shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in UPI App</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 6. DEVELOPER API CODE SWITCHER                       */}
      {/* ---------------------------------------------------- */}
      <section id="developers" className="py-24 md:py-32 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-wider">Developer First</h2>
            <h3 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Integrate in Minutes, Not Weeks
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Clean, predictable REST endpoints with robust webhook signature verification.
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-[#0f172a] shadow-2xl overflow-hidden text-white">
            {/* Terminal Header */}
            <div className="px-6 py-4 bg-[#1e293b] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-3.5 h-3.5 rounded-full bg-rose-500/80" />
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80" />
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80" />
                <span className="text-xs sm:text-sm font-mono text-slate-400 ml-2 font-bold">create-payment-order</span>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl text-xs font-mono">
                {(['curl', 'node', 'python', 'php'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    className={`px-3 py-1.5 rounded-lg transition uppercase font-bold ${
                      selectedLang === lang 
                        ? 'bg-blue-600 text-white shadow-xs' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Body */}
            <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto relative">
              <button
                onClick={copyCodeToClipboard}
                className="absolute top-5 right-5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-sans font-bold flex items-center gap-2 transition"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
              <pre className="leading-relaxed">
                <code>{codeSnippets[selectedLang]}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 7. TRANSPARENT PRICING PLANS                         */}
      {/* ---------------------------------------------------- */}
      <section id="pricing" className="py-24 md:py-32 bg-[#f8fafc] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-wider">Simple & Transparent</h2>
            <h3 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Keep 100% of Your Revenue
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              No hidden gateway transaction percentage fees. Pay a flat subscription for direct settlements.
            </p>

            {/* Monthly / Yearly Switcher */}
            <div className="pt-4 flex items-center justify-center gap-3 text-sm font-bold">
              <span className={billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-400'}>
                Monthly Billing
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="w-14 h-7 rounded-full bg-blue-600 relative p-1 transition"
              >
                <span 
                  className={`w-5 h-5 rounded-full bg-white transition-transform block ${
                    billingCycle === 'yearly' ? 'transform translate-x-7' : ''
                  }`} 
                />
              </button>
              <span className={`flex items-center gap-2 ${billingCycle === 'yearly' ? 'text-slate-900' : 'text-slate-400'}`}>
                <span>Yearly Billing</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                  2 Months Free
                </span>
              </span>
            </div>
          </div>

          {/* Pricing Grid (6 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {pricingTiers.map((tier) => {
              const price = billingCycle === 'monthly' ? tier.priceMonthly : tier.priceYearly;
              return (
                <div
                  key={tier.id}
                  className={`p-7 sm:p-8 rounded-2xl bg-white border flex flex-col justify-between transition-all relative ${
                    tier.popular
                      ? 'border-blue-600 shadow-lg shadow-blue-600/10 ring-2 ring-blue-600/20'
                      : 'border-slate-200/90 shadow-2xs hover:border-slate-300'
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-xs">
                      Most Popular
                    </span>
                  )}

                  <div className="space-y-5">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{tier.name}</h4>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1 min-h-[36px]">{tier.description}</p>
                    </div>

                    <div className="pt-1">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">
                          ₹{price}
                        </span>
                        <span className="text-xs sm:text-sm text-slate-400 font-semibold">
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-5 space-y-3">
                      {tier.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                          <Check className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-7">
                    <Link
                      href="/register"
                      className={`w-full py-3 rounded-xl font-bold text-sm shadow-xs transition active:scale-95 flex items-center justify-center ${
                        tier.popular
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      {tier.priceMonthly === 0 ? 'Get Started Free' : 'Choose Plan'}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 8. FAQ ACCORDION / HIGHLIGHTS                        */}
      {/* ---------------------------------------------------- */}
      <section id="faq" className="py-24 md:py-32 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center space-y-4">
            <h2 className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-wider">Got Questions?</h2>
            <h3 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4.5">
            <div className="p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white space-y-2">
              <h4 className="text-base sm:text-lg font-bold text-slate-900">How is there 0% commission on transactions?</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                UPI transactions in India are inherently 0% interchange fee for P2P and P2M peer checkouts. Unlike traditional aggregators who charge 2-3% markup fees, UPIEdge charges only a flat subscription for software automation and webhook routing.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white space-y-2">
              <h4 className="text-base sm:text-lg font-bold text-slate-900">How does automated payment verification work?</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our companion listener application connects directly to your merchant devices, securely reads incoming payment success notifications, verifies the UTR / Ref reference, and triggers instant webhooks to your server.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white space-y-2">
              <h4 className="text-base sm:text-lg font-bold text-slate-900">Can I connect multiple PhonePe or Google Pay devices?</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Yes! With Pro, Business, and Enterprise plans, you can connect multiple merchant phones. UPIEdge automatically distributes traffic across your active devices to prevent individual bank daily transaction limits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 9. FINAL CALL TO ACTION BANNER                       */}
      {/* ---------------------------------------------------- */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Ready to Take Full Control of Your Payments?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Join forward-thinking Indian founders, merchants, and SaaS companies processing crores in direct-to-bank UPI volume without middleman cuts.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/25 transition active:scale-95 flex items-center justify-center gap-2.5"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-200 transition active:scale-95 flex items-center justify-center gap-2.5 shadow-2xs"
            >
              <span>Sign in to Account</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 10. PLATFORM FOOTER                                  */}
      {/* ---------------------------------------------------- */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-900 text-base">UPIEdge Gateway</span>
            <span>•</span>
            <span>© 2026-27 UPIEdge. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <a href="#features" className="hover:text-slate-900 transition">Features</a>
            <a href="#pricing" className="hover:text-slate-900 transition">Pricing</a>
            <a href="#developers" className="hover:text-slate-900 transition">API Docs</a>
            <span className="hover:text-slate-900 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-900 cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
