import React from 'react';
import AuthView from '@/app/components/AuthView';

export const metadata = {
  title: 'Sign in to Account | UPIEdge Gateway',
  description: 'Sign in to your UPIEdge merchant dashboard to manage devices, transactions, and webhooks.'
};

export default function LoginPage() {
  return <AuthView initialMode="login" />;
}
