'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutGrid, 
  Store, 
  ArrowLeftRight, 
  ShoppingCart, 
  Settings 
} from 'lucide-react';

interface BottomNavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/user/dashboard', icon: LayoutGrid },
  { id: 'connect', label: 'Connect', href: '/user/connect-merchant', icon: Store },
  { id: 'transactions', label: 'Transactions', href: '/user/transactions', icon: ArrowLeftRight },
  { id: 'plans', label: 'Plans', href: '/user/buy-plan', icon: ShoppingCart },
  { id: 'settings', label: 'Settings', href: '/user/settings', icon: Settings },
];

export default function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 lg:hidden px-2 py-1.5 flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.04)] select-none"
      aria-label="Mobile Bottom Navigation"
    >
      {BOTTOM_NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = 
          pathname === item.href || 
          pathname.startsWith(item.href + '/') ||
          (item.id === 'plans' && pathname === '/user/active-plan');

        return (
          <Link
            key={item.id}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-all active:scale-90 ${
              isActive
                ? 'text-slate-900 font-bold'
                : 'text-slate-400 hover:text-slate-700 font-medium'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <Icon 
                className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? 'text-slate-900 scale-110' : 'text-slate-400'
                }`} 
              />
            </div>
            <span className="text-[10px] mt-1 tracking-tight">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
