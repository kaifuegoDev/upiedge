import { Transaction, UpiDevice, ApiKeyItem, WebhookLog } from '../types';

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_839201',
    orderId: 'ORD_98241',
    amount: 1499.00,
    customerName: 'Rahul Verma',
    customerPhone: '+91 98201 44821',
    customerUpi: 'rahul.verma@oksbi',
    utr: '421884920184',
    status: 'SUCCESS',
    webhookStatus: 'DELIVERED',
    upiHandle: 'upiedge.store@okhdfcbank',
    note: 'Payment for Pro Annual Plan',
    createdAt: 'Just now',
    completedAt: 'Just now',
    intentUrl: 'upi://pay?pa=upiedge.store@okhdfcbank&pn=UPIEdgeStore&am=1499.00&cu=INR&tr=ORD_98241&tn=Payment%20for%20Pro%20Plan'
  },
  {
    id: 'tx_839200',
    orderId: 'ORD_98240',
    amount: 499.00,
    customerName: 'Ananya Sharma',
    customerPhone: '+91 91123 99482',
    customerUpi: 'ananya.sharma@paytm',
    utr: '421884910248',
    status: 'SUCCESS',
    webhookStatus: 'DELIVERED',
    upiHandle: 'upiedge.store@okhdfcbank',
    note: 'Starter Plan Upgrade',
    createdAt: '2 mins ago',
    completedAt: '2 mins ago',
    intentUrl: 'upi://pay?pa=upiedge.store@okhdfcbank&pn=UPIEdgeStore&am=499.00&cu=INR&tr=ORD_98240&tn=Starter%20Plan'
  },
  {
    id: 'tx_839199',
    orderId: 'ORD_98239',
    amount: 2999.00,
    customerName: 'Vikram Mehta',
    customerPhone: '+91 94450 12839',
    customerUpi: 'vikram.m@apl',
    utr: undefined,
    status: 'PENDING',
    webhookStatus: 'PENDING',
    upiHandle: 'payments.upiedge@icici',
    note: 'Enterprise API Credits',
    createdAt: '5 mins ago',
    intentUrl: 'upi://pay?pa=payments.upiedge@icici&pn=UPIEdgeStore&am=2999.00&cu=INR&tr=ORD_98239&tn=API%20Credits'
  },
  {
    id: 'tx_839198',
    orderId: 'ORD_98238',
    amount: 799.00,
    customerName: 'Priya Iyer',
    customerPhone: '+91 88720 34912',
    customerUpi: 'priyaiyer@ybl',
    utr: '421884883920',
    status: 'SUCCESS',
    webhookStatus: 'DELIVERED',
    upiHandle: 'upiedge.store@okhdfcbank',
    note: 'Digital Asset Bundle',
    createdAt: '12 mins ago',
    completedAt: '11 mins ago',
    intentUrl: 'upi://pay?pa=upiedge.store@okhdfcbank&pn=UPIEdgeStore&am=799.00&cu=INR&tr=ORD_98238&tn=Digital%20Asset'
  },
  {
    id: 'tx_839197',
    orderId: 'ORD_98237',
    amount: 199.00,
    customerName: 'Kunal Singh',
    customerPhone: '+91 97188 23847',
    customerUpi: 'kunals@ibl',
    utr: undefined,
    status: 'EXPIRED',
    webhookStatus: 'NOT_CONFIGURED',
    upiHandle: 'payments.upiedge@icici',
    note: 'Discord Community Pass',
    createdAt: '28 mins ago',
    intentUrl: 'upi://pay?pa=payments.upiedge@icici&pn=UPIEdgeStore&am=199.00&cu=INR&tr=ORD_98237&tn=Community%20Pass'
  },
  {
    id: 'tx_839196',
    orderId: 'ORD_98236',
    amount: 5499.00,
    customerName: 'DevSolutions LLP',
    customerPhone: '+91 99801 84729',
    customerUpi: 'finance@icici',
    utr: '421884762914',
    status: 'SUCCESS',
    webhookStatus: 'DELIVERED',
    upiHandle: 'upiedge.store@okhdfcbank',
    note: 'Annual SaaS Invoice #INV-298',
    createdAt: '45 mins ago',
    completedAt: '44 mins ago',
    intentUrl: 'upi://pay?pa=upiedge.store@okhdfcbank&pn=UPIEdgeStore&am=5499.00&cu=INR&tr=ORD_98236&tn=Invoice%20298'
  },
  {
    id: 'tx_839195',
    orderId: 'ORD_98235',
    amount: 899.00,
    customerName: 'Amit Patel',
    customerPhone: '+91 98402 11983',
    customerUpi: 'amitpatel@axl',
    utr: '421884650192',
    status: 'SUCCESS',
    webhookStatus: 'DELIVERED',
    upiHandle: 'upiedge.store@okhdfcbank',
    note: 'Premium UI Kit License',
    createdAt: '1 hour ago',
    completedAt: '1 hour ago',
    intentUrl: 'upi://pay?pa=upiedge.store@okhdfcbank&pn=UPIEdgeStore&am=899.00&cu=INR&tr=ORD_98235&tn=UI%20Kit'
  }
];

export const INITIAL_DEVICES: UpiDevice[] = [
  {
    id: 'dev_pixel7a_01',
    deviceName: 'Google Pixel 7a (Sync Daemon)',
    batteryLevel: 92,
    isOnline: true,
    lastSync: '10 seconds ago',
    vpaHandles: [
      'upiedge.store@okhdfcbank (HDFC Current A/c)',
      'payments.upiedge@icici (ICICI Business A/c)'
    ],
    androidVersion: 'Android 14 (API 34)',
    appVersion: 'UPIEdge Forwarder v2.4.1',
    isAutoRotate: true,
    totalVolumeHandled: 489240
  },
  {
    id: 'dev_samsung_02',
    deviceName: 'Samsung Galaxy M34 (Backup Standby)',
    batteryLevel: 78,
    isOnline: false,
    lastSync: '2 hours ago',
    vpaHandles: [
      'standby.upiedge@axisbank'
    ],
    androidVersion: 'Android 13 (OneUI 5.1)',
    appVersion: 'UPIEdge Forwarder v2.3.8',
    isAutoRotate: false,
    totalVolumeHandled: 124800
  }
];

export const INITIAL_API_KEYS: ApiKeyItem[] = [
  {
    id: 'key_prod_01',
    name: 'Production Server Key',
    key: 'upe_live_9a8f4c2e1b7d5a3f9e8d2c4b6a1',
    mode: 'live',
    createdAt: '2025-01-15',
    lastUsed: 'Just now'
  },
  {
    id: 'key_test_01',
    name: 'Local Development & Staging',
    key: 'upe_test_7c3b9e1a5f4d2e8b0a9c3e7f1d2',
    mode: 'test',
    createdAt: '2025-02-01',
    lastUsed: '3 mins ago'
  }
];

export const INITIAL_WEBHOOK_LOGS: WebhookLog[] = [
  {
    id: 'wh_9281',
    orderId: 'ORD_98241',
    event: 'payment.success',
    endpointUrl: 'https://api.yourdomain.com/webhooks/upiedge',
    status: 'SUCCESS',
    statusCode: 200,
    payload: JSON.stringify({
      event: 'payment.success',
      order_id: 'ORD_98241',
      amount: 1499.00,
      currency: 'INR',
      utr: '421884920184',
      customer_upi: 'rahul.verma@oksbi',
      status: 'SUCCESS',
      timestamp: '2025-02-18T01:45:20Z'
    }, null, 2),
    response: '{"status": "ok", "delivered": true}',
    timestamp: 'Just now',
    durationMs: 84
  },
  {
    id: 'wh_9280',
    orderId: 'ORD_98240',
    event: 'payment.success',
    endpointUrl: 'https://api.yourdomain.com/webhooks/upiedge',
    status: 'SUCCESS',
    statusCode: 200,
    payload: JSON.stringify({
      event: 'payment.success',
      order_id: 'ORD_98240',
      amount: 499.00,
      currency: 'INR',
      utr: '421884910248',
      customer_upi: 'ananya.sharma@paytm',
      status: 'SUCCESS',
      timestamp: '2025-02-18T01:43:10Z'
    }, null, 2),
    response: '{"status": "ok", "message": "Order activated"}',
    timestamp: '2 mins ago',
    durationMs: 112
  }
];
