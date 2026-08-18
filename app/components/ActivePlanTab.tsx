import React from 'react';
import { 
  Check, 
  Zap, 
  ArrowRight
} from 'lucide-react';

interface ActivePlanTabProps {
  setActiveTab?: (tab: string) => void;
  currentPlanId?: string;
}

export default function ActivePlanTab({ 
  setActiveTab,
  currentPlanId = 'pro'
}: ActivePlanTabProps) {
  const planDetails: Record<string, {
    name: string;
    price: string;
    handles: string;
    txns: string;
    features: string[];
  }> = {
    starter: {
      name: 'Starter Plan',
      price: '₹0.00 / month',
      handles: '1 Active UPI Handle',
      txns: '100 Transactions / month',
      features: [
        '1 Active Merchant UPI Handle',
        'Standard Webhook Notifications',
        'Community Discord Support',
        '0% Gateway Commission'
      ]
    },
    basic: {
      name: 'Basic Merchant Plan',
      price: '₹299.00 / month',
      handles: '2 Active UPI Handles',
      txns: '1,500 Transactions / month',
      features: [
        '2 Connected UPI Handles with Rotation',
        'Automated UTR Verification',
        'Email Support (12h SLA)',
        '0% Gateway Commission'
      ]
    },
    pro: {
      name: 'Pro Merchant Plan',
      price: '₹599.00 / month',
      handles: '5 Active UPI Handles',
      txns: 'Unlimited Volume',
      features: [
        '5 Active Merchant UPI Handles with Auto-Rotation',
        'Unlimited Orders & Dynamic QR generation',
        'High-Speed Webhook Dispatch (<1s latency)',
        'Telegram & WhatsApp Transaction Alerts',
        'Priority Technical Support'
      ]
    },
    business: {
      name: 'Business Plus Plan',
      price: '₹999.00 / month',
      handles: '10 Active UPI Handles',
      txns: 'Unlimited Volume',
      features: [
        '10 Connected UPI Handles with Load Balancing',
        'Multi-Merchant Dynamic Routing',
        'SMS & Webhook Retry System',
        '99.9% High Availability SLA'
      ]
    },
    agency: {
      name: 'Scale Agency Plan',
      price: '₹1,899.00 / month',
      handles: '25 Active UPI Handles',
      txns: 'Unlimited Volume',
      features: [
        '25 Connected UPI Handles',
        'Sub-Merchant Multi-Client API Access',
        'Advanced Failover & Rate Limiting',
        'Dedicated Support Engineer'
      ]
    },
    enterprise: {
      name: 'Enterprise Custom Plan',
      price: '₹3,499.00 / month',
      handles: 'Unlimited Handles',
      txns: 'Unlimited Volume',
      features: [
        'Unlimited Connected UPI Handles',
        'Dedicated Cloud Verification Daemon',
        'Custom Webhook Static IPs & HMAC',
        '24/7 Priority SLA & Dedicated Account Manager'
      ]
    }
  };

  const current = planDetails[currentPlanId] || planDetails.pro;

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Active Subscription Plan</h2>
        <p className="text-xs text-slate-500">
          View your current subscription tier, quota limits, and renewal details.
        </p>
      </div>

      {/* Main Active Plan Card */}
      <div className="p-6 rounded-lg bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-xs">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-base font-bold text-slate-900">{current.name}</h3>
                <span className="text-[11px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Billed at <strong>{current.price}</strong> • 0% Transaction Fees
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {setActiveTab && (
              <button
                onClick={() => setActiveTab('buy-plan')}
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 active:scale-95"
              >
                <span>Upgrade Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Quota & Usage Stats */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Plan Usage & Allocation</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Monthly Transactions</span>
              <div className="text-lg font-bold text-slate-900 mt-1 font-mono">{current.txns}</div>
              <p className="text-[11px] text-emerald-700 font-semibold mt-1">0% Gateway Fees</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Connected Merchant Handles</span>
              <div className="text-lg font-bold text-blue-700 mt-1 font-mono">{current.handles}</div>
              <p className="text-[11px] text-slate-500 mt-1">Auto-Load Balancing</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Renewal Status</span>
              <div className="text-lg font-bold text-slate-900 mt-1 font-mono">Active (Auto-Renew)</div>
              <p className="text-[11px] text-slate-500 mt-1">Next bill: 30 days from now</p>
            </div>
          </div>
        </div>

        {/* Included Features Checklist */}
        <div className="pt-2">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Included Active Features</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
            {current.features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-md bg-slate-50 border border-slate-200">
                <div className="p-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
