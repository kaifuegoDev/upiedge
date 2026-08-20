'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutGrid, 
  Store, 
  Building2, 
  ArrowLeftRight, 
  ShoppingCart, 
  ToggleRight, 
  FileText, 
  Settings, 
  SquareTerminal, 
  FileCode, 
  Puzzle,
  Layers,
  Link2,
  X
} from 'lucide-react';

interface SidebarProps {
  isTestMode?: boolean;
  listenerConnected?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

interface NavGroup {
  category?: string;
  items: {
    id: string;
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    isExternalLink?: boolean;
  }[];
}

const NAVIGATION_GROUPS: NavGroup[] = [
  {
    items: [
      { id: 'overview', label: 'Dashboard', href: '/user/dashboard', icon: LayoutGrid },
      { id: 'connect-merchant', label: 'Connect Merchant', href: '/user/connect-merchant', icon: Store },
      { id: 'multi-merchant', label: 'Multi Merchant', href: '/user/multi-merchant', icon: Building2, isExternalLink: true },
    ]
  },
  {
    category: 'Reports',
    items: [
      { id: 'transactions', label: 'Transaction', href: '/user/transactions', icon: ArrowLeftRight },
    ]
  },
  {
    category: 'Plans',
    items: [
      { id: 'buy-plan', label: 'Buy Plan', href: '/user/buy-plan', icon: ShoppingCart },
      { id: 'active-plan', label: 'Active Subscription', href: '/user/active-plan', icon: ToggleRight },
      { id: 'payment-report', label: 'Payment Report', href: '/user/payment-report', icon: FileText },
    ]
  },
  {
    category: 'Settings',
    items: [
      { id: 'settings', label: 'Payment Settings', href: '/user/settings', icon: Settings },
    ]
  },
  {
    category: 'API & Docs',
    items: [
      { id: 'docs', label: 'Docs', href: '/user/docs', icon: FileCode },
      { id: 'api-webhooks', label: 'API Key & Webhook', href: '/user/api-webhooks', icon: SquareTerminal },
    ]
  }
];

export default function Sidebar({
  isOpen = false,
  onClose
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar (Desktop Sticky + Mobile Drawer) */}
      <aside 
        className={`w-72 sm:w-[275px] bg-white border-r border-slate-200 flex flex-col h-screen fixed lg:sticky top-0 left-0 z-50 shrink-0 select-none shadow-xl lg:shadow-none transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Logo Header */}
        <div className="h-16 px-6 border-b border-slate-200 flex items-center justify-between shrink-0">
          <Link 
            href="/user/dashboard" 
            onClick={() => onClose && onClose()}
            className="flex items-center gap-3.5"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center shadow-xs text-white">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-slate-900">
                UPIEdge
              </span>
            </div>
          </Link>

          {/* Close Button on Mobile Drawer */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation with Categories */}
        <nav className="flex-1 px-4 py-4 space-y-4.5 overflow-y-auto">
          {NAVIGATION_GROUPS.map((group, groupIdx) => (
            <div key={`group-${groupIdx}`} className="space-y-1">
              {group.category && (
                <div className="px-3.5 pb-1 text-xs font-semibold text-slate-700 tracking-tight">
                  {group.category}
                </div>
              )}

              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => onClose && onClose()}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-slate-100 text-slate-900 font-semibold shadow-2xs'
                        : 'text-slate-900 hover:text-black hover:bg-slate-50 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <Icon className="w-5 h-5 shrink-0 text-slate-900" />
                      <span>{item.label}</span>
                    </div>

                    {item.isExternalLink && (
                      <span className="p-1 rounded-md bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center">
                        <Link2 className="w-3.5 h-3.5 rotate-45" />
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
