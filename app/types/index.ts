export type TransactionStatus = 'SUCCESS' | 'PENDING' | 'FAILED' | 'EXPIRED';
export type WebhookStatus = 'DELIVERED' | 'PENDING' | 'FAILED' | 'NOT_CONFIGURED';

export interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  customerName?: string;
  customerPhone?: string;
  customerUpi?: string;
  utr?: string;
  status: TransactionStatus;
  webhookStatus: WebhookStatus;
  upiHandle: string;
  note: string;
  createdAt: string;
  completedAt?: string;
  intentUrl: string;
}

export interface UpiDevice {
  id: string;
  deviceName: string;
  batteryLevel: number;
  isOnline: boolean;
  lastSync: string;
  vpaHandles: string[];
  androidVersion: string;
  appVersion: string;
  isAutoRotate: boolean;
  totalVolumeHandled: number;
}

export interface ApiKeyItem {
  id: string;
  name: string;
  key: string;
  mode: 'live' | 'test';
  createdAt: string;
  lastUsed: string;
}

export interface WebhookLog {
  id: string;
  orderId: string;
  event: string;
  endpointUrl: string;
  status: 'SUCCESS' | 'FAILED' | 'RETRYING';
  statusCode: number;
  payload: string;
  response: string;
  timestamp: string;
  durationMs: number;
}
