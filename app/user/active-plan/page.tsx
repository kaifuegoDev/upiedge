'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ActivePlanTab from '../../components/ActivePlanTab';

export default function UserActivePlanPage() {
  const router = useRouter();
  const [currentPlanId, setCurrentPlanId] = useState<string>('pro');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('upiedge_current_plan');
      if (saved) setCurrentPlanId(saved);
    } catch {}
  }, []);

  return (
    <ActivePlanTab
      currentPlanId={currentPlanId}
      setActiveTab={(tab) => {
        if (tab === 'buy-plan' || tab === 'plans') {
          router.push('/user/buy-plan');
        } else {
          router.push(`/user/${tab}`);
        }
      }}
    />
  );
}
