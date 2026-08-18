import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Check, 
  ArrowRight
} from 'lucide-react';

interface PlansTabProps {
  currentPlan?: string;
  onSelectPlan?: (planId: string, planName: string, price: number, billingCycle: 'monthly' | 'yearly') => void;
}

export default function PlansTab({
  currentPlan = 'pro',
  onSelectPlan
}: PlansTabProps) {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'starter',
      name: 'Starter Plan',
      description: 'Ideal for indie developers, test projects & small digital stores.',
      priceMonthly: 0,
      priceYearly: 0,
      isPopular: false,
      badge: 'Free Tier',
      features: [
        '1 Connected UPI ID',
        'Up to 100 Transactions / month',
        'Standard Webhook Delivery',
        'Community Discord Support',
        '0% Gateway Commission'
      ],
      buttonText: currentPlan === 'starter' ? 'Current Plan' : 'Get Starter Free'
    },
    {
      id: 'basic',
      name: 'Basic Merchant',
      description: 'Perfect for small shops, creators, and single-product SaaS.',
      priceMonthly: 299,
      priceYearly: 2870,
      isPopular: false,
      badge: 'Starter Pro',
      features: [
        '2 Connected UPI IDs',
        '1,500 Transactions / month',
        'Automated UTR Verification',
        'Email Support (12h response)',
        '0% Gateway Commission'
      ],
      buttonText: currentPlan === 'basic' ? 'Current Plan' : 'Upgrade to Basic'
    },
    {
      id: 'pro',
      name: 'Pro Merchant',
      description: 'Best for growing businesses, ecommerce & SaaS platforms.',
      priceMonthly: 599,
      priceYearly: 5750,
      isPopular: true,
      badge: 'Most Popular',
      features: [
        '5 Connected UPI IDs (Auto-Rotation)',
        'Unlimited Transactions & Volume',
        'High-Speed Webhooks (<1s)',
        'Telegram & WhatsApp Alerts',
        'Priority Support & 0% Fees'
      ],
      buttonText: currentPlan === 'pro' ? 'Active Plan' : 'Upgrade to Pro'
    },
    {
      id: 'business',
      name: 'Business Plus',
      description: 'High-volume merchants requiring multi-UPI load balancing.',
      priceMonthly: 999,
      priceYearly: 9590,
      isPopular: false,
      badge: 'Growth Scale',
      features: [
        '10 Connected UPI IDs',
        'Unlimited Transactions & Volume',
        'Multi-Merchant Dynamic Routing',
        'SMS & Webhook Retry System',
        '99.9% High Availability SLA'
      ],
      buttonText: currentPlan === 'business' ? 'Current Plan' : 'Upgrade to Business'
    },
    {
      id: 'agency',
      name: 'Scale Agency',
      description: 'For agencies, marketing consultancies & client aggregators.',
      priceMonthly: 1899,
      priceYearly: 18230,
      isPopular: false,
      badge: 'Agency Pro',
      features: [
        '25 Connected UPI IDs',
        'Unlimited Transactions & Volume',
        'Sub-Merchant API Access',
        'Advanced Failover & Webhook Logs',
        'Dedicated Support Engineer'
      ],
      buttonText: currentPlan === 'agency' ? 'Current Plan' : 'Upgrade to Agency'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Custom',
      description: 'Full-scale enterprise infrastructure with dedicated cloud daemons.',
      priceMonthly: 3499,
      priceYearly: 33590,
      isPopular: false,
      badge: 'Maximum Scale',
      features: [
        'Unlimited Connected UPI IDs',
        'Unlimited Transactions & Volume',
        'Dedicated Cloud Verification Daemon',
        'Custom Webhook Static IPs & HMAC',
        '24/7 Priority SLA & Account Manager'
      ],
      buttonText: currentPlan === 'enterprise' ? 'Current Plan' : 'Upgrade to Enterprise'
    }
  ];

  const handlePlanClick = (plan: typeof plans[0]) => {
    if (currentPlan === plan.id) return;
    const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;

    if (price === 0) {
      if (onSelectPlan) {
        onSelectPlan(plan.id, plan.name, 0, billingCycle);
      }
      return;
    }

    // Standalone payment page route
    const orderId = 'ORD_' + Math.floor(100000 + Math.random() * 900000);
    router.push(`/payment/${orderId}?amount=${price}&plan=${encodeURIComponent(plan.name)}&planId=${plan.id}&vpa=example@upi`);
  };

  return (
    <div className="space-y-8 pb-16 max-w-[1240px] mx-auto">
      {/* Header & Billing Cycle Selector */}
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Flexible & Transparent Plans</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Keep 100% of your customer payments. No hidden transaction percentage cuts or escrow lock-ins.
        </p>

        {/* Monthly / Yearly Switch */}
        <div className="pt-2 flex items-center justify-center">
          <div className="p-1 bg-slate-100 rounded-lg border border-slate-200 flex items-center gap-1 shadow-xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-md text-xs font-bold ${
                billingCycle === 'monthly'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;
          const isCurrent = currentPlan === plan.id;

          return (
            <div
              key={plan.id}
              className={`p-6 rounded-lg bg-white border relative flex flex-col justify-between shadow-xs ${
                plan.isPopular 
                  ? 'border-blue-500 ring-2 ring-blue-500/10 shadow-md' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-slate-900">{plan.name}</h3>
                  {!plan.isPopular && (
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 leading-relaxed mb-5 min-h-[34px]">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="mb-6 pb-5 border-b border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900">₹{price.toLocaleString('en-IN')}</span>
                    <span className="text-xs font-semibold text-slate-400">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-bold block mt-1">
                    0% gateway commission always
                  </span>
                </div>

                {/* Feature List */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-700">
                      <div className="p-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                disabled={isCurrent}
                onClick={() => handlePlanClick(plan)}
                className={`w-full py-2.5 rounded-md font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition active:scale-95 ${
                  isCurrent
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                    : plan.isPopular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <span>{plan.buttonText}</span>
                {!isCurrent && <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
