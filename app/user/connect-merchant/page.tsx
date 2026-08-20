'use client';

import React, { useState } from 'react';
import ConnectMerchantTab from '../../components/ConnectMerchantTab';
import { INITIAL_DEVICES } from '../../data/mockData';

export default function UserConnectMerchantPage() {
  const [devices, setDevices] = useState(INITIAL_DEVICES);
  const [listenerConnected, setListenerConnected] = useState<boolean>(true);

  return (
    <ConnectMerchantTab
      devices={devices}
      setDevices={setDevices}
      listenerConnected={listenerConnected}
      setListenerConnected={setListenerConnected}
    />
  );
}
