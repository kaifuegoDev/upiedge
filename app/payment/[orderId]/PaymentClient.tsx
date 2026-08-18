'use client';

import React, { Suspense } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import HostedPaymentView from '@/app/components/HostedPaymentView';

function PaymentContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const orderId = (params?.orderId as string) || 'ORD_100293';
  const amount = Number(searchParams.get('amount')) || 299.00;
  const upiVpa = searchParams.get('vpa') || 'example@upi';
  const payeeName = searchParams.get('name') || 'UPIEdge';
  const planName = searchParams.get('plan') || 'Pro Subscription';
  const planId = searchParams.get('planId') || 'pro';
  const note = `Subscription - ${planName}`;

  return (
    <HostedPaymentView
      orderId={orderId}
      amount={amount}
      upiVpa={upiVpa}
      payeeName={payeeName}
      note={note}
      onClose={() => {
        router.push('/user/active-plan');
      }}
      onPaymentSuccess={(id, utr) => {
        if (typeof window !== 'undefined' && planId) {
          localStorage.setItem('upiedge_current_plan', planId);
        }
      }}
    />
  );
}

export default function PaymentClient() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-xs">Loading Payment...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
