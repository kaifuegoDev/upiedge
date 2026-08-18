'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PlansTab from '../../components/PlansTab';

export default function UserBuyPlanPage() {
  const router = useRouter();
  const [currentPlanId, setCurrentPlanId] = useState<string>('pro');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('upiedge_current_plan');
      if (saved) setCurrentPlanId(saved);
    } catch {}
  }, []);

  return (
    <PlansTab
      currentPlan={currentPlanId}
      onSelectPlan={(planId) => {
        try {
          localStorage.setItem('upiedge_current_plan', planId);
        } catch {}
        router.push('/user/active-plan');
      }}
    />
  );
}
