import { Transaction, UpiDevice, ApiKeyItem, WebhookLog } from '../types';

export const INITIAL_TRANSACTIONS: Transaction[] = [];

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
