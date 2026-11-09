import React from 'react';

export function Topbar({ t, lang, setLang, currency, setCurrency, darkMode, setDarkMode, setIsNewBookingOpen, menuConfig, activeTab }) {
  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-bold capitalize">{menuConfig[activeTab]?.label || activeTab}</h2>
        <span className="hidden md:inline-block text-xs bg-brand-50 dark:bg-brand-950 text-brand-600 px-2.5 py-1 rounded-full font-medium">
          {t.shortcutHint}
        </span>
      </div>

      <div className="flex items-center space-x-3">
        <select value={lang} onChange={e => setLang(e.target.value)} className="bg-slate-100 dark:bg-slate-800 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 outline-none cursor-pointer">
          <option value="es">🇪🇸 ES</option>
          <option value="en">🇬🇧 EN</option>
        </select>

        <select value={currency} onChange={e => setCurrency(e.target.value)} className="bg-slate-100 dark:bg-slate-800 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 outline-none cursor-pointer">
          <option value="EUR">EUR (€)</option>
          <option value="USD">USD ($)</option>
          <option value="GBP">GBP (£)</option>
        </select>

        <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition" title="Cambiar Tema">
          {darkMode ? '☀️' : '🌙'}
        </button>

        <button onClick={() => setIsNewBookingOpen(true)} className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-lg shadow-brand-600/20 transition">
          + {t.newReservation}
        </button>
      </div>
    </header>
  );
}
