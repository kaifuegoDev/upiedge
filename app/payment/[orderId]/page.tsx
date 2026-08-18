import React from 'react';
import PaymentClient from './PaymentClient';

export function generateStaticParams() {
  return [
    { orderId: 'sample' },
    { orderId: 'ORD_1001' },
    { orderId: 'ORD_1002' },
  ];
}

export default function HostedPaymentPage() {
  return <PaymentClient />;
}
