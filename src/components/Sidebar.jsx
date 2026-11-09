import React from 'react';

export function Sidebar({ menuConfig, activeTab, setActiveTab, user, handleLogout }) {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
      <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
        <div>
          <h1 className="font-bold text-white tracking-wide text-base">Grand Horizon</h1>
          <p className="text-xs text-slate-400 capitalize mt-0.5">Turno: {user.shift}</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {Object.entries(menuConfig).map(([key, config]) => {
          if (!config.visible) return null;
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition text-sm ${
                isActive ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30' : 'hover:bg-slate-800/60 text-slate-400 hover:text-white'
              }`}
            >
              <span>{config.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="truncate max-w-[120px]" title={user.name}>{user.name}</span>
        <button onClick={handleLogout} className="text-red-400 hover:text-red-300 font-semibold px-2 py-1 rounded hover:bg-slate-800 transition">Salir</button>
      </div>
    </aside>
  );
}
