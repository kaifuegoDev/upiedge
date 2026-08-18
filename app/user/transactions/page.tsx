'use client';

import React, { useState } from 'react';
import TransactionsTab from '../../components/TransactionsTab';
import { INITIAL_TRANSACTIONS } from '../../data/mockData';
import { Transaction } from '../../types';

export default function UserTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  return (
    <TransactionsTab
      transactions={transactions}
      setTransactions={setTransactions}
    />
  );
}
