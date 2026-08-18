'use client';

import React from 'react';
import OverviewTab from '../../components/OverviewTab';
import { INITIAL_TRANSACTIONS, INITIAL_DEVICES } from '../../data/mockData';

export default function UserDashboardPage() {
  return (
    <OverviewTab
      transactions={INITIAL_TRANSACTIONS}
      devices={INITIAL_DEVICES}
    />
  );
}
