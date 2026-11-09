import React from 'react';

export function Settings({ menuConfig, setMenuConfig, user, usersList, setUsersList }) {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="font-bold text-lg mb-4">Personalización del Menú</h3>
        <p className="text-sm text-slate-500 mb-4">Modifica las etiquetas o la visibilidad de los elementos del menú lateral.</p>
        <div className="space-y-3">
          {Object.entries(menuConfig).map(([key, config]) => (
            <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <input 
                type="text" 
                value={config.label}
                onChange={e => {
                  const val = e.target.value;
                  setMenuConfig({...menuConfig, [key]: { ...config, label: val }});
                }}
                className="bg-transparent font-semibold border-b border-transparent focus:border-brand-500 outline-none px-2 py-1"
              />
              <label className="flex items-center space-x-2 text-sm cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={config.visible}
                  onChange={e => {
                    const checked = e.target.checked;
                    setMenuConfig({...menuConfig, [key]: { ...config, visible: checked }});
                  }}
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 w-4 h-4"
                />
                <span>Visible</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {user.role === 'admin' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Gestión de Usuarios y Turnos</h3>
          <div className="space-y-3">
            {usersList.map((u, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                <div>
                  <p className="font-semibold text-sm">{u.name} (@{u.username})</p>
                  <p className="text-xs text-slate-500">Rol: {u.role} • Turno: {u.shift}</p>
                </div>
                {u.username !== 'admin' && (
                  <button 
                    onClick={() => setUsersList(usersList.filter(item => item.username !== u.username))}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition"
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
