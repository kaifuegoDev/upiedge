import React, { useState } from 'react';
import { 
  Key, 
  Send, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Globe,
  Code
} from 'lucide-react';
import { ApiKeyItem, WebhookLog } from '../types';

interface ApiWebhooksTabProps {
  apiKeys: ApiKeyItem[];
  setApiKeys: React.Dispatch<React.SetStateAction<ApiKeyItem[]>>;
  webhookLogs: WebhookLog[];
  setWebhookLogs: React.Dispatch<React.SetStateAction<WebhookLog[]>>;
}

export default function ApiWebhooksTab({
  apiKeys,
  webhookLogs,
  setWebhookLogs
}: ApiWebhooksTabProps) {
  const [webhookUrl, setWebhookUrl] = useState('https://api.yourdomain.com/api/upiedge-webhook');
  const [webhookSecret] = useState('whsec_83f9104b2a8d9e1f5c6b7e');
  const [visibleKeys, setVisibleKeys] = useState<{ [id: string]: boolean }>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; code: number; latency: number } | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // API Reference state
  const [selectedLang, setSelectedLang] = useState<'curl' | 'nodejs' | 'python' | 'php'>('curl');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleSimulateWebhookPing = () => {
    setIsTestingWebhook(true);
    setTestResult(null);

    setTimeout(() => {
      setIsTestingWebhook(false);
      const latency = Math.floor(65 + Math.random() * 80);
      setTestResult({ success: true, code: 200, latency });

      const sampleOrderId = 'ORD_' + Math.floor(10000 + Math.random() * 90000);
      const newLog: WebhookLog = {
        id: 'wh_' + Date.now().toString().slice(-4),
        orderId: sampleOrderId,
        event: 'payment.success',
        endpointUrl: webhookUrl,
        status: 'SUCCESS',
        statusCode: 200,
        payload: JSON.stringify({
          event: 'payment.success',
          order_id: sampleOrderId,
          amount: 999.00,
          currency: 'INR',
          utr: '4218' + Math.floor(10000000 + Math.random() * 90000000),
          status: 'SUCCESS'
        }, null, 2),
        response: '{"status": "ok", "delivered": true}',
        timestamp: 'Just now',
        durationMs: latency
      };

      setWebhookLogs(prev => [newLog, ...prev]);
    }, 1000);
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

console.log(response.data);`,
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
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">API Keys & Webhooks</h2>
        <p className="text-xs text-slate-500">
          Manage REST API authentication credentials, webhook endpoints, and integration code snippets.
        </p>
      </div>

      {/* Grid: Left API Keys, Right Webhook Config */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: API Keys */}
        <div className="space-y-4">
          <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Merchant API Keys</h3>
              </div>
              <button 
                onClick={() => alert('New key generated.')}
                className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition"
              >
                + New Key
              </button>
            </div>

            <div className="space-y-3">
              {apiKeys.map((keyItem) => {
                const isVisible = !!visibleKeys[keyItem.id];
                const displayKey = isVisible 
                  ? keyItem.key 
                  : `${keyItem.key.slice(0, 10)}•••••••••••••••••••••••••${keyItem.key.slice(-4)}`;

                return (
                  <div key={keyItem.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800">{keyItem.name}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold uppercase ${
                          keyItem.mode === 'live' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {keyItem.mode}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">Used {keyItem.lastUsed}</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-md bg-white border border-slate-200 font-mono text-xs text-slate-800">
                      <span className="truncate pr-2">{displayKey}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => toggleKeyVisibility(keyItem.id)}
                          className="p-1 rounded text-slate-400 hover:text-slate-700 transition"
                          title={isVisible ? 'Hide' : 'Reveal'}
                        >
                          {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => copyText(keyItem.key, keyItem.id)}
                          className="p-1 rounded text-slate-400 hover:text-blue-600 transition"
                          title="Copy Key"
                        >
                          {copiedId === keyItem.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-500 space-y-1">
              <p className="font-semibold text-slate-700">Security Note:</p>
              <p>Keep API keys secure. Never expose private keys in frontend client code.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Webhook Settings */}
        <div className="space-y-4">
          <form onSubmit={handleSaveWebhook} className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Webhook Notification</h3>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Active Endpoint
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Webhook Notification URL (HTTPS)
              </label>
              <input
                type="url"
                required
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://yourdomain.com/api/webhook"
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs font-mono text-blue-700 focus:outline-none focus:bg-white focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                HMAC Signature Secret (<code className="text-slate-600">x-upiedge-signature</code>)
              </label>
              <div className="flex items-center justify-between p-2 rounded-md bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800">
                <span className="truncate pr-2">{webhookSecret}</span>
                <button
                  type="button"
                  onClick={() => copyText(webhookSecret, 'whsec')}
                  className="p-1 rounded text-slate-400 hover:text-blue-600 transition shrink-0"
                >
                  {copiedId === 'whsec' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleSimulateWebhookPing}
                disabled={isTestingWebhook}
                className="px-3.5 py-2 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold transition flex items-center gap-1.5"
              >
                <Send className={`w-3.5 h-3.5 text-blue-600 ${isTestingWebhook ? 'animate-bounce' : ''}`} />
                <span>{isTestingWebhook ? 'Sending...' : 'Send Test Webhook'}</span>
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition active:scale-95 flex items-center gap-1.5"
              >
                {isSaved ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Save URL</span>
                )}
              </button>
            </div>

            {testResult && (
              <div className="p-3 rounded-md bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>HTTP {testResult.code} OK - Webhook received</span>
                </div>
                <span className="font-mono text-[11px] text-slate-500">{testResult.latency}ms</span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Webhook Delivery Logs */}
      <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Webhook Deliveries</h3>
            <p className="text-xs text-slate-500">Log of outgoing server notifications and response codes</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold">
                <th className="py-2.5 px-3">Event</th>
                <th className="py-2.5 px-3">Order ID</th>
                <th className="py-2.5 px-3">Endpoint</th>
                <th className="py-2.5 px-3">HTTP Code</th>
                <th className="py-2.5 px-3">Latency</th>
                <th className="py-2.5 px-3 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {webhookLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-3 font-mono font-semibold text-blue-700">{log.event}</td>
                  <td className="py-3 px-3 font-mono font-medium text-slate-800">{log.orderId}</td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-500 truncate max-w-[200px]">{log.endpointUrl}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-md font-mono font-bold text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                      HTTP {log.statusCode}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-500">{log.durationMs}ms</td>
                  <td className="py-3 px-3 text-right text-slate-500 font-mono">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Integrated API Reference Section */}
      <div className="space-y-6 pt-4 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-600" />
              <span>Developer API Reference & Code Samples</span>
            </h3>
            <p className="text-xs text-slate-500">
              Quick start code snippets for dynamic QR generation and webhook handling.
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 border border-slate-200 shadow-xs">
            {[
              { id: 'curl', label: 'cURL' },
              { id: 'nodejs', label: 'Node.js' },
              { id: 'python', label: 'Python' },
              { id: 'php', label: 'PHP' },
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id as any)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition ${
                  selectedLang === lang.id
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Endpoint 1: Create Order */}
        <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 rounded-md bg-blue-50 text-blue-700 font-mono font-bold text-xs border border-blue-200">
                POST
              </span>
              <span className="font-mono text-sm text-slate-900 font-bold">/api/v1/order/create</span>
            </div>
            <span className="text-xs text-slate-500">Dynamic QR & Intent</span>
          </div>

          <p className="text-xs text-slate-600">
            Creates a dynamic UPI payment session. Returns deep links for PhonePe, Google Pay, Paytm, and raw QR string.
          </p>

          {/* Code Snippet Box */}
          <div className="relative rounded-lg bg-slate-900 border border-slate-800 overflow-hidden shadow-xs">
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
          <div className="relative rounded-lg bg-slate-900 border border-slate-800 overflow-hidden shadow-xs">
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

        {/* Endpoint 2: Webhook Callback */}
        <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 rounded-md bg-indigo-50 text-indigo-700 font-mono font-bold text-xs border border-indigo-200">
                WEBHOOK
              </span>
              <span className="font-mono text-sm text-slate-900 font-bold">payment.success Callback Payload</span>
            </div>
            <span className="text-xs text-slate-500">Server Event</span>
          </div>

          <p className="text-xs text-slate-600">
            When customer payment completes, UPIEdge dispatches this HTTP POST to your webhook URL:
          </p>

          <div className="relative rounded-lg bg-slate-900 border border-slate-800 overflow-hidden shadow-xs">
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
    </div>
  );
}
