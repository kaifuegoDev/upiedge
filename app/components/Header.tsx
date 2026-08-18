'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bell, 
  Headphones,
  Settings,
  Key,
  LogOut,
  MessageCircle,
  Mail,
  X,
  ExternalLink,
  ShieldCheck,
  Menu,
  Layers
} from 'lucide-react';

interface HeaderProps {
  isTestMode?: boolean;
  setIsTestMode?: (val: boolean) => void;
  searchQuery?: string;
  setSearchQuery?: (val: string) => void;
  openCreatePayment?: () => void;
  openWebhookTester?: () => void;
  refreshData?: () => void;
  isRefreshing?: boolean;
  onToggleSidebar?: () => void;
}

export default function Header({
  onToggleSidebar
}: HeaderProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Mobile Left: Hamburger Menu Button */}
      <div className="flex items-center lg:hidden">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition active:scale-95"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Desktop spacer to push right actions to the right */}
      <div className="hidden lg:block" />

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3 ml-auto">
        {/* Connect Support Icon Button */}
        <button
          onClick={() => setShowSupportModal(true)}
          className="p-1.5 sm:p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative shadow-xs transition active:scale-95"
          title="Connect Support"
        >
          <Headphones className="w-4 h-4" />
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button 
            className="p-1.5 sm:p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative shadow-xs transition active:scale-95"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-slate-900 absolute top-1.5 right-1.5 ring-2 ring-white" />
          </button>
        </div>

        {/* Vertical Separator */}
        <div className="h-6 w-px bg-slate-200 mx-0.5 sm:mx-1" />

        {/* User Profile Circular Button & Popover */}
        <div className="relative" ref={profileMenuRef}>
          <button
            type="button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-800 hover:ring-2 hover:ring-slate-300 transition active:scale-95"
          >
            DU
          </button>

          {/* Popover Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 top-11 w-56 rounded-lg bg-white border border-slate-200 shadow-xl z-50 py-1.5 text-xs animate-in fade-in-50 zoom-in-95 duration-150">
              {/* User info Header */}
              <div className="px-3.5 py-2.5 border-b border-slate-100 bg-slate-50/50">
                <p className="font-bold text-slate-900 truncate">Demo User</p>
                <p className="text-[11px] text-slate-500 font-mono truncate">demo@upiedge.com</p>
              </div>

              {/* Links */}
              <div className="py-1">
                <Link
                  href="/user/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-slate-700 hover:bg-slate-50 font-medium transition text-left"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>Payment Settings</span>
                </Link>
                <Link
                  href="/user/api-webhooks"
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-slate-700 hover:bg-slate-50 font-medium transition text-left"
                >
                  <Key className="w-3.5 h-3.5 text-slate-400" />
                  <span>API Keys & Webhooks</span>
                </Link>
              </div>

              {/* Logout */}
              <div className="border-t border-slate-100 pt-1">
                <a
                  href="/login"
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-rose-600 hover:bg-rose-50 font-medium transition text-left"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  <span>Log Out</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Connect Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-sm w-full p-5 space-y-4 animate-in fade-in-50 zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-slate-900" />
                <h3 className="text-sm font-bold text-slate-900">Connect Support</h3>
              </div>
              <button
                onClick={() => setShowSupportModal(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Need assistance with your UPI integration, device listener sync, or webhooks? Connect with our dedicated engineering support:
            </p>

            <div className="space-y-2">
              <a
                href="https://t.me/UPIEdgeSupport"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition text-xs font-semibold text-slate-800"
              >
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-sky-500" />
                  <span>Official Telegram Support</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <a
                href="mailto:support@upiedge.com"
                className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition text-xs font-semibold text-slate-800"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-rose-500" />
                  <span>support@upiedge.com</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowSupportModal(false)}
                className="w-full py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition active:scale-95"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
