'use client';

import React, { useState } from 'react';
import ApiWebhooksTab from '../../components/ApiWebhooksTab';
import { INITIAL_API_KEYS, INITIAL_WEBHOOK_LOGS } from '../../data/mockData';

export default function UserApiWebhooksPage() {
  const [apiKeys, setApiKeys] = useState(INITIAL_API_KEYS);
  const [webhookLogs, setWebhookLogs] = useState(INITIAL_WEBHOOK_LOGS);

  return (
    <ApiWebhooksTab
      apiKeys={apiKeys}
      setApiKeys={setApiKeys}
      webhookLogs={webhookLogs}
      setWebhookLogs={setWebhookLogs}
    />
  );
}
