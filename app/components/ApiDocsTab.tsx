import React, { useState } from 'react';
import { 
  Copy, 
  Check
} from 'lucide-react';

export default function ApiDocsTab() {
  const [selectedLang, setSelectedLang] = useState<'curl' | 'nodejs' | 'python' | 'php'>('curl');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const codeSnippets = {
    createOrder: {
      curl: `curl -X POST https://api.upiedge.com/api/v1/order/create \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: upe_live_9a8f4c2e1b7d5a3f9e8d2c4b6a1" \\
  -d '{
    "order_id": "ORD_100293",
    "amount": 499.00,
    "customer_name": "Rahul Verma",
    "customer_phone": "+919876543210",
    "note": "Pro Subscription Upgrade",
    "redirect_url": "https://yoursite.com/checkout/success"
  }'`,
      nodejs: `import axios from 'axios';

const response = await axios.post('https://api.upiedge.com/api/v1/order/create', {
  order_id: 'ORD_100293',
  amount: 499.00,
  customer_name: 'Rahul Verma',
  customer_phone: '+919876543210',
  note: 'Pro Subscription Upgrade',
  redirect_url: 'https://yoursite.com/checkout/success'
}, {
  headers: {
    'x-api-key': process.env.UPIEDGE_API_KEY,
    'Content-Type': 'application/json'
  }
});

console.log(response.data);
// { status: true, order_id: "ORD_100293", upi_intent: "upi://pay?...", qr_svg: "..." }`,
      python: `import requests

url = "https://api.upiedge.com/api/v1/order/create"
headers = {
    "x-api-key": "upe_live_9a8f4c2e1b7d5a3f9e8d2c4b6a1",
    "Content-Type": "application/json"
}
payload = {
    "order_id": "ORD_100293",
    "amount": 499.00,
    "customer_name": "Rahul Verma",
    "note": "Pro Subscription Upgrade"
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`,
      php: `<?php
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.upiedge.com/api/v1/order/create',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => json_encode(array(
    "order_id" => "ORD_100293",
    "amount" => 499.00,
    "customer_name" => "Rahul Verma",
    "note" => "Pro Subscription Upgrade"
  )),
  CURLOPT_HTTPHEADER => array(
    'x-api-key: upe_live_9a8f4c2e1b7d5a3f9e8d2c4b6a1',
    'Content-Type: application/json'
  ),
));

$response = curl_exec($curl);
curl_close($curl);
echo $response;
?>`
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Developer API Reference</h2>
        <p className="text-xs text-slate-500">
          Generate dynamic UPI payment QRs and automate webhook fulfillment in under 5 minutes.
        </p>
      </div>

      {/* Language Selector */}
      <div className="flex items-center gap-2 p-1 rounded-xl bg-white border border-slate-200 shadow-xs w-fit">
        {[
          { id: 'curl', label: 'cURL' },
          { id: 'nodejs', label: 'Node.js' },
          { id: 'python', label: 'Python' },
          { id: 'php', label: 'PHP' },
        ].map((lang) => (
          <button
            key={lang.id}
            onClick={() => setSelectedLang(lang.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              selectedLang === lang.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      {/* Endpoint 1: Create Order */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 font-mono font-bold text-xs border border-blue-200">
              POST
            </span>
            <span className="font-mono text-sm text-slate-900 font-bold">/api/v1/order/create</span>
          </div>
          <span className="text-xs text-slate-500">Dynamic QR & Intent</span>
        </div>

        <p className="text-xs text-slate-600">
          Creates a dynamic UPI payment request session. Returns deep links for PhonePe, Google Pay, Paytm, and raw QR string.
        </p>

        {/* Code Snippet Box */}
        <div className="relative rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xs">
          <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400">Request ({selectedLang})</span>
            <button
              onClick={() => copyCode(codeSnippets.createOrder[selectedLang], 'create_order')}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition"
            >
              {copiedSection === 'create_order' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedSection === 'create_order' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto">
            {codeSnippets.createOrder[selectedLang]}
          </pre>
        </div>

        {/* Response JSON */}
        <div className="relative rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xs">
          <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <span className="text-[11px] font-mono text-emerald-400">Response (JSON)</span>
          </div>
          <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto">{`{
  "status": true,
  "message": "Order created successfully",
  "data": {
    "order_id": "ORD_100293",
    "amount": 499.00,
    "currency": "INR",
    "upi_vpa": "upiedge.store@okhdfcbank",
    "upi_intent": "upi://pay?pa=upiedge.store@okhdfcbank&pn=UPIEdgeStore&am=499.00&cu=INR&tr=ORD_100293&tn=Pro%20Upgrade",
    "apps": {
      "gpay": "tez://upi/pay?pa=upiedge.store@okhdfcbank...",
      "phonepe": "phonepe://pay?pa=upiedge.store@okhdfcbank...",
      "paytm": "paytmmp://pay?pa=upiedge.store@okhdfcbank..."
    },
    "expires_in_seconds": 900
  }
}`}</pre>
        </div>
      </div>

      {/* Endpoint 2: Webhook Callback Payload */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 rounded bg-indigo-50 text-indigo-700 font-mono font-bold text-xs border border-indigo-200">
              WEBHOOK
            </span>
            <span className="font-mono text-sm text-slate-900 font-bold">payment.success Callback</span>
          </div>
          <span className="text-xs text-slate-500">Server Event</span>
        </div>

        <p className="text-xs text-slate-600">
          When the customer finishes payment and our sync node verifies the bank UTR, UPIEdge sends this HTTP POST to your webhook URL:
        </p>

        <div className="relative rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xs">
          <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <span className="text-[11px] font-mono text-indigo-300">Payload sent to your server</span>
          </div>
          <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto">{`{
  "event": "payment.success",
  "order_id": "ORD_100293",
  "amount": 499.00,
  "currency": "INR",
  "utr": "421884920184",
  "customer_upi": "rahul.verma@oksbi",
  "status": "SUCCESS",
  "timestamp": "2025-02-18T01:45:20Z"
}`}</pre>
        </div>
      </div>
    </div>
  );
}
