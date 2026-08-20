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
      priceMonthly: 1299,
      priceYearly: 12990,
      popular: false,
      features: [
        'Up to 15,000 Transactions / month',
        '10 Active UPI Merchant IDs',
        'Real-time UTR Reconciliation',
        'Dedicated Technical Account Rep',
        '0% Gateway Cut'
      ]
    },
    {
      id: 'agency',
      name: 'Agency Tier',
      description: 'For digital agencies managing multiple merchant clients.',
      priceMonthly: 2499,
      priceYearly: 24990,
      popular: false,
      features: [
        'Up to 50,000 Transactions / month',
        '25 Active UPI Merchant IDs',
        'Sub-Account Multi-Tenant Control',
        'Custom Domain Hostings',
        '24/7 SLA Priority On-Call',
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
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center shadow-xs text-white">
              <Layers className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">
              UPIEdge
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <button onClick={() => handleNavClick('features')} className="hover:text-blue-600 transition">Features</button>
            <button onClick={() => handleNavClick('demo')} className="hover:text-blue-600 transition">Live Demo</button>
            <button onClick={() => handleNavClick('pricing')} className="hover:text-blue-600 transition">Pricing</button>
            <button onClick={() => handleNavClick('developers')} className="hover:text-blue-600 transition">API & Docs</button>
            <button onClick={() => handleNavClick('faq')} className="hover:text-blue-600 transition">FAQ</button>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/login"
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 transition"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs shadow-blue-600/20 transition active:scale-95 flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------- */}
      {/* 2. HERO SECTION                                      */}
      {/* ---------------------------------------------------- */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden border-b border-slate-100">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-xs font-semibold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Zero Commission • Direct-to-Bank Gateway</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Accept UPI Payments <br />
                <span className="text-blue-600">With 0% Transaction Cut</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Stop losing 2-3% on every payment. UPIEdge lets you accept direct customer payments right into your merchant bank account with instant automated UTR verification and webhooks.
              </p>

              {/* CTA Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Link
                  href="/register"
                  className="w-full sm:w-auto px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/25 transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => handleNavClick('demo')}
                  className="w-full sm:w-auto px-6 py-3 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <QrCode className="w-4 h-4 text-slate-600" />
                  <span>Try Live Sandbox</span>
                </button>
              </div>

              {/* Social Trust Metrics */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-100 max-w-md mx-auto lg:mx-0">
                <div>
                  <div className="text-xl font-extrabold text-slate-900 font-mono">0%</div>
                  <div className="text-[11px] text-slate-500 font-medium">Gateway Fees</div>
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-900 font-mono">Instant</div>
                  <div className="text-[11px] text-slate-500 font-medium">Bank Settlement</div>
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-900 font-mono">99.98%</div>
                  <div className="text-[11px] text-slate-500 font-medium">Uptime SLA</div>
                </div>
              </div>
            </div>

            {/* Hero Right Mockup Floating Checkout */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-lg border border-slate-200 bg-white p-5 sm:p-6 shadow-xl shadow-slate-200/40 space-y-4 relative">
                {/* Top status bar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center text-white text-xs font-bold shadow-2xs">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-900 block leading-none">UPI Instant Checkout</span>
                      <span className="text-[10px] text-slate-400">Order #ORD_902810</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Direct Pay
                  </span>
                </div>

                {/* Amount Display */}
                <div className="rounded-md bg-slate-50 border border-slate-100 p-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">Amount Due</span>
                    <span className="text-[10px] text-emerald-600 font-medium">0% Gateway Convenience Fee</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 font-mono">₹499.00</div>
                </div>

                {/* Dynamic QR Box */}
                <div className="p-4 bg-white rounded-md border border-slate-200 flex flex-col items-center justify-center shadow-2xs space-y-3 text-center">
                  <div className="p-2.5 bg-white rounded-md border border-slate-200 shadow-2xs">
                    <QRCodeSVG value={upiIntent} size={150} level="M" />
                  </div>
                  
                  {/* Supported UPI Apps Badges */}
                  <div className="flex items-center justify-center gap-1.5 pt-0.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#5f259f] text-white">PhonePe</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-slate-700 border border-slate-200">GPay</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#002e6e] text-white">Paytm</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-white">BHIM</span>
                  </div>
                </div>

                {/* Secure Trust Footer */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Direct-to-Bank Settlement</span>
                  </div>
                  <span className="font-mono text-slate-400">Valid: 09:42</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. SUPPORTED UPI APPS & ECOSYSTEM                    */}
      {/* ---------------------------------------------------- */}
      <section className="py-12 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Works with 100+ UPI Apps & All Major Indian Banks
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="text-sm font-extrabold text-slate-800 tracking-tight">PhonePe</span>
            <span className="text-sm font-extrabold text-slate-800 tracking-tight">Google Pay</span>
            <span className="text-sm font-extrabold text-slate-800 tracking-tight">Paytm UPI</span>
            <span className="text-sm font-extrabold text-slate-800 tracking-tight">BHIM NPCI</span>
            <span className="text-sm font-extrabold text-slate-800 tracking-tight">HDFC Bank</span>
            <span className="text-sm font-extrabold text-slate-800 tracking-tight">ICICI Bank</span>
            <span className="text-sm font-extrabold text-slate-800 tracking-tight">SBI UPI</span>
            <span className="text-sm font-extrabold text-slate-800 tracking-tight">Cred UPI</span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. CORE FEATURES & ADVANTAGES                        */}
      {/* ---------------------------------------------------- */}
      <section id="features" className="py-20 md:py-28 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider">Built For Scale & Freedom</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why High-Growth Businesses Choose UPIEdge
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Traditional payment gateways hold your money in escrow, charge 2-3% cuts, and block your account without notice. UPIEdge brings back full control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all space-y-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Percent className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">0% Commission Cut</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Every rupee paid by your customer goes directly into your bank account. No deductions, no hidden processing fees.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all space-y-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Instant Settlements (T+0)</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Zero waiting for T+2 settlement cycles. Funds land instantly in your bank UPI ID the moment the customer scans.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all space-y-4">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Server className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Real-Time Webhooks</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Automated notification listeners listen for incoming bank SMS/Push notifications and trigger signed HMAC webhooks in &lt;1.5 seconds.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all space-y-4">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Smart Device Auto-Rotation</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Connect multiple merchant devices (PhonePe, GPay, Paytm, BHIM) and auto-rotate handles to prevent daily bank limit caps.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all space-y-4">
              <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Zero Custody Risk</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                UPIEdge never touches or holds merchant money in escrow. There is zero risk of sudden account freezes or fund withholdings.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all space-y-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Code className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Simple REST API & SDKs</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Integrate in under 15 minutes with comprehensive SDKs for Node.js, Python, PHP, Laravel, and WordPress WooCommerce.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. INTERACTIVE LIVE QR DEMO SANDBOX                  */}
      {/* ---------------------------------------------------- */}
      <section id="demo" className="py-20 md:py-28 bg-[#f8fafc] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider">Interactive Playground</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Test Dynamic UPI QR Generation
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Enter any amount and merchant UPI handle below to generate a live, scannable payment intent in real-time.
            </p>
          </div>

          <div className="max-w-3xl mx-auto rounded-lg border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Controls */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700">
                      Payment Amount (₹ INR)
                    </label>
                    <div className="flex items-center gap-1">
                      {[199, 499, 999, 1999].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setDemoAmount(amt)}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition ${
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
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 shadow-2xs"
                    placeholder="499"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700">
                      Destination Merchant UPI ID
                    </label>
                  </div>
                  <input
                    type="text"
                    value={demoVpa}
                    onChange={(e) => setDemoVpa(e.target.value)}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 shadow-2xs"
                    placeholder="example@upi"
                  />
                  <div className="flex flex-wrap items-center gap-1 pt-0.5">
                    {['@okhdfcbank', '@paytm', '@okaxis', '@ybl', '@upi'].map((suffix) => (
                      <button
                        key={suffix}
                        type="button"
                        onClick={() => {
                          const prefix = demoVpa.includes('@') ? demoVpa.split('@')[0] : demoVpa;
                          setDemoVpa((prefix || 'merchant') + suffix);
                        }}
                        className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-mono transition"
                      >
                        {suffix}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-md bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-1">
                  <p className="font-bold text-[11px] text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Real Dynamic UPI Intent</span>
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono break-all leading-tight">
                    {upiIntent}
                  </p>
                </div>
              </div>

              {/* Result Preview Card */}
              <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-lg border border-slate-200 text-center space-y-3">
                <div className="p-3 bg-white rounded-md border border-slate-200 shadow-2xs">
                  <QRCodeSVG value={upiIntent} size={150} level="M" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-900 font-mono">₹{demoAmount.toFixed(2)}</div>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">Scan with any UPI App to test</p>
                </div>
                <a
                  href={upiIntent}
                  className="px-3.5 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition active:scale-95 flex items-center gap-1.5 shadow-2xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
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
      <section id="developers" className="py-20 md:py-28 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider">Developer First</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Integrate in Minutes, Not Weeks
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Clean, predictable REST endpoints with robust webhook signature verification.
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-xl border border-slate-800 bg-[#0f172a] shadow-xl overflow-hidden text-white">
            {/* Terminal Header */}
            <div className="px-4 py-3 bg-[#1e293b] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">create-payment-order</span>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-md text-xs font-mono">
                {(['curl', 'node', 'python', 'php'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    className={`px-2.5 py-1 rounded transition uppercase ${
                      selectedLang === lang 
                        ? 'bg-blue-600 text-white font-bold shadow-xs' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Body */}
            <div className="p-5 font-mono text-xs text-slate-200 overflow-x-auto relative">
              <button
                onClick={copyCodeToClipboard}
                className="absolute top-4 right-4 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-sans flex items-center gap-1.5 transition"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
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
      <section id="pricing" className="py-20 md:py-28 bg-[#f8fafc] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider">Simple & Transparent</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Keep 100% of Your Revenue
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              No hidden gateway transaction percentage fees. Pay a flat subscription for unlimited direct settlements.
            </p>

            {/* Monthly / Yearly Switcher */}
            <div className="pt-4 flex items-center justify-center gap-3 text-xs font-bold">
              <span className={billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-400'}>
                Monthly Billing
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="w-12 h-6 rounded-full bg-blue-600 relative p-1 transition"
              >
                <span 
                  className={`w-4 h-4 rounded-full bg-white transition-transform block ${
                    billingCycle === 'yearly' ? 'transform translate-x-6' : ''
                  }`} 
                />
              </button>
              <span className={`flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'text-slate-900' : 'text-slate-400'}`}>
                <span>Yearly Billing</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                  2 Months Free
                </span>
              </span>
            </div>
          </div>

          {/* Pricing Grid (6 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => {
              const price = billingCycle === 'monthly' ? tier.priceMonthly : tier.priceYearly;
              return (
                <div
                  key={tier.id}
                  className={`p-6 rounded-xl bg-white border flex flex-col justify-between transition-all relative ${
                    tier.popular
                      ? 'border-blue-600 shadow-md shadow-blue-600/10 ring-2 ring-blue-600/20'
                      : 'border-slate-200/90 shadow-2xs hover:border-slate-300'
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                      Most Popular
                    </span>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{tier.name}</h4>
                      <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{tier.description}</p>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-slate-900 font-mono">
                          ₹{price}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4 space-y-2.5">
                      {tier.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link
                      href="/register"
                      className={`w-full py-2.5 rounded-md font-bold text-xs shadow-xs transition active:scale-95 flex items-center justify-center ${
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
      <section id="faq" className="py-20 md:py-28 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider">Got Questions?</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-lg border border-slate-200 bg-white space-y-1.5">
              <h4 className="text-xs font-bold text-slate-900">How is there 0% commission on transactions?</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                UPI transactions in India are inherently 0% interchange fee for P2P and P2M peer checkouts. Unlike traditional aggregators who charge 2-3% markup fees, UPIEdge charges only a flat subscription for software automation and webhook routing.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-slate-200 bg-white space-y-1.5">
              <h4 className="text-xs font-bold text-slate-900">How does automated payment verification work?</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our companion listener application connects directly to your merchant devices, securely reads incoming payment success notifications, verifies the UTR / Ref reference, and triggers instant webhooks to your server.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-slate-200 bg-white space-y-1.5">
              <h4 className="text-xs font-bold text-slate-900">Can I connect multiple PhonePe or Google Pay devices?</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Yes! With Pro, Business, and Enterprise plans, you can connect multiple merchant phones. UPIEdge automatically distributes traffic across your active devices to prevent individual bank daily transaction limits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 9. FINAL CALL TO ACTION BANNER                       */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Ready to Take Full Control of Your Payments?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Join forward-thinking Indian founders, merchants, and SaaS companies processing crores in direct-to-bank UPI volume without middleman cuts.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/register"
              className="w-full sm:w-auto px-7 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/25 transition active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-7 py-3 rounded-md bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 transition active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Sign in to Account</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 10. PLATFORM FOOTER                                  */}
      {/* ---------------------------------------------------- */}
      <footer className="bg-white border-t border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center text-white text-[10px] font-bold">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-900">UPIEdge Gateway</span>
            <span>•</span>
            <span>© 2026-27 UPIEdge. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 font-medium">
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
