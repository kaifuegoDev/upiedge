import React from 'react';
import AuthView from '@/app/components/AuthView';

export const metadata = {
  title: 'Create New Account | UPIEdge Gateway',
  description: 'Create a merchant account on UPIEdge to start accepting direct-to-bank UPI payments with 0% commission.'
};

export default function RegisterPage() {
  return <AuthView initialMode="register" />;
}
