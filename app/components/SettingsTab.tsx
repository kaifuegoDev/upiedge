import React, { useState } from 'react';
import { 
  Check, 
  ShoppingBag,
  Upload
} from 'lucide-react';

export default function SettingsTab() {
  const [enableUpiIntent, setEnableUpiIntent] = useState<boolean>(true);
  const [displayName, setDisplayName] = useState<string>('FUEGO PLATFORMS');
  const [themeColor, setThemeColor] = useState<string>('#000000');
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setIconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="max-w-[1000px] mx-auto space-y-7 pb-20 font-sans select-none">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-slate-900">Payment Settings</h1>
        <p className="text-xs text-slate-500">
          Configure your payment preferences and UPI settings
        </p>
      </div>

      <div className="border-b border-slate-200/80" />

      <form onSubmit={handleSave} className="space-y-8">
        {/* 1. UPI SETTINGS */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold tracking-wider text-slate-800 uppercase">
              UPI SETTINGS
            </span>
            <div className="flex-1 border-b border-slate-200" />
          </div>

          <div className="p-4 rounded-lg border border-slate-200/90 bg-[#fbfcfd] flex items-center justify-between shadow-2xs">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Enable UPI Intent</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Allow direct UPI payment transactions
              </p>
            </div>

            {/* Toggle Switch */}
            <button
              type="button"
              onClick={() => setEnableUpiIntent(!enableUpiIntent)}
              className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                enableUpiIntent ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`w-4 h-4 bg-white rounded-full transition-transform absolute top-1 left-1 shadow-sm ${
                  enableUpiIntent ? 'transform translate-x-5' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* 2. CUSTOMIZE PAYMENT PAGE */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold tracking-wider text-slate-800 uppercase">
              CUSTOMIZE PAYMENT PAGE
            </span>
            <div className="flex-1 border-b border-slate-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Display Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-blue-500 shadow-2xs transition"
                placeholder="Enter Display Name"
              />
            </div>

            {/* Theme Color */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                Theme Color
              </label>
              <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 shadow-2xs focus-within:border-blue-500 transition">
                {/* Color preview square */}
                <input
                  type="color"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="w-5 h-5 rounded-xs cursor-pointer border border-slate-200 p-0 bg-transparent"
                />
                <span className="text-xs text-slate-400 font-mono">#</span>
                <input
                  type="text"
                  value={themeColor.replace('#', '')}
                  onChange={(e) => setThemeColor(`#${e.target.value}`)}
                  className="w-full text-xs text-slate-900 font-mono font-medium focus:outline-none uppercase"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. DISPLAY ICON */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold tracking-wider text-slate-800 uppercase">
              DISPLAY ICON
            </span>
            <div className="flex-1 border-b border-slate-200" />
          </div>

          <div className="flex items-center gap-4">
            {/* Icon Preview Box */}
            <div className="w-16 h-16 rounded-lg border border-slate-200 p-2 flex items-center justify-center bg-white shadow-2xs overflow-hidden shrink-0">
              {iconPreview ? (
                <img src={iconPreview} alt="Icon Preview" className="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full rounded-md bg-[#ff9800] text-white flex items-center justify-center shadow-xs">
                  <ShoppingBag className="w-6 h-6 text-white stroke-[2.2]" />
                </div>
              )}
            </div>

            {/* Upload Button & Format info */}
            <div>
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 border border-slate-200 shadow-2xs transition active:scale-95">
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                <span>Upload Icon</span>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/gif"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
                PNG, JPG, GIF (Max 2MB)
              </p>
            </div>
          </div>
        </div>

        {/* 4. Action Button */}
        <div className="pt-2 flex items-center gap-3">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition active:scale-95 flex items-center gap-1.5"
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Settings Saved!</span>
              </>
            ) : (
              <span>Update Settings</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
